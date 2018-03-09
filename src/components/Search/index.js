import React, {Component} from "react";
import {Link} from "react-router-dom";
import * as BooksAPI from "../../BooksAPI";
import BookItem from "../BookItem";

class Search extends Component {

    state = {
        books: []
    };
    handleSearch = (event) => {
        const query = event.target.value;
        BooksAPI.search(query).then(books => {
            this.setState({
                books: books.map(book => {
                    return {
                        ...book
                    }
                }),
                searchField: query
            })
            console.log(this.state.books, "sadasdas");

        })
    };


    render() {
        const {books} = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                               placeholder="Search by title or author"
                               onChange={this.handleSearch}/>

                    </div>
                </div>
                <div className="search-books-results">
                    <div className="bookshelf">
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books.map((book) => (
                                    <BookItem key={book.id} books={book}/>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;