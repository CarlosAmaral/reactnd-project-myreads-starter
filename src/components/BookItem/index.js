import React, {Component} from "react";
import {Rate} from "antd";
import * as BooksAPI from "../../BooksAPI";
import PropTypes from 'prop-types';

class BookItem extends Component {
    static propTypes = {
        book: PropTypes.array.isRequired,
        updateBook: PropTypes.func.isRequired
    };

    render() {
        const {book, updateBook} = this.prop;

        const image=(book.imageLinks && book.imageLinks.thumbnail?book.imageLinks.thumbnail:'')
        const shelf=(book.shelf?book.shelf:"none")

        return (
            <li key={book.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: '100%',
                            height: '100%',
                            backgroundImage: `url(${image})`
                        }}></div>
                        <div className="book-shelf-changer">
                            <select value={shelf} onChange={(event) => updateBook(book,event.target.value)}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently
                                    Reading
                                </option>
                                <option value="wantToRead">Want to Read
                                </option>
                                <option  value="read">Read</option>
                                <option  value="none">None</option>
                            </select>
                        </div>
                    </div>

                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </div>
                <Rate disabled value={book.averageRating}/>
            </li>
        )
    }
}

export default BookItem;