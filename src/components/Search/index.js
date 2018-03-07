import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Rate} from "antd";
import * as BooksAPI from '../../BooksAPI'
import escapeRegExp from 'escape-string-regexp';
import PropTypes from "prop-types";
import BookItem from "../BookItem";

class Search extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired
    };

    state = {
        query: ''
    };


    handleSearch = (event) => {
        const query = event.target.value
        BooksAPI.search(query).then(books => {
            this.setState({
                books: books.map(book => {
                    console.log(book);
                    return {
                        ...book
                    }
                }),
                searchField: query
            })
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
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {this.books.map(book => (
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