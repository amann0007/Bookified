import React from 'react'
import HeroSection from "@/components/HeroSection";
import BookCard from "@/components/BookCard";
import { getAllBooks } from "@/lib/actions/book.actions";
import Search from "@/components/Search";

import { sampleBooks } from "@/lib/constants";

const Page = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {
    const { query } = await searchParams;

    const bookResults = await getAllBooks(query)
    const dbBooks = bookResults.success ? bookResults.data ?? [] : []

    // Filter sample books if there is a search query
    const filteredSampleBooks = query
        ? sampleBooks.filter(book =>
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase())
        )
        : sampleBooks;

    // Combine database books with sample books
    const displayBooks = [...dbBooks, ...filteredSampleBooks];

    return (
        <main className="wrapper container">
            <HeroSection />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10">
                <h2 className="text-3xl font-serif font-bold text-[#212a3b]">Recent Books</h2>
                <Search />
            </div>

            <div className="library-books-grid">
                {displayBooks.map((book) => (
                    <BookCard key={book._id} title={book.title} author={book.author} coverURL={book.coverURL} slug={book.slug} />
                ))}
            </div>
        </main>
    )
}

export default Page
