import React, {Component} from "react"
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import * as BooksAPI from "../../BooksAPI";
import BookItem from "../BookItem";

class Search extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        updateBook: PropTypes.func.isRequired,
        query: PropTypes.string,
        updateQuery: PropTypes.func.isRequired
    };



    render() {
        const {books, updateBook, updateQuery, query} = this.props;
        return (
        
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                               placeholder="Search by title or author" value={query}
                               onChange={(event) => updateQuery(event.target.value)}/>

                    </div>
                </div>

                <div className="search-books-results">
                    <div className="bookshelf">
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books.map((book) => (
                                    <BookItem key={book.id} updateBook={updateBook} book={book}/>
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