import React, {Component} from "react";
import {Rate} from "antd";

class BookItem extends Component {

    render() {
        this.state = {books: this.props.books};
        const {books} = this.state;

        return (
            <li key={books.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: '100%',
                            height: '100%',
                            backgroundImage: `url(${books.imageLinks.smallThumbnail})`
                        }}></div>
                        <div className="book-shelf-changer">
                            <select>
                                <option value="none" disabled>Move to...</option>
                                <option defaultValue={books.shelf === 'currentlyReading'}
                                        value="currentlyReading">Currently
                                    Reading
                                </option>
                                <option defaultValue={books.shelf === 'wantToRead'} value="wantToRead">Want to Read
                                </option>
                                <option defaultValue={books.shelf === 'read'} value="read">Read</option>
                                <option defaultValue={books.shelf === ''} value="none">None</option>
                            </select>
                        </div>
                    </div>

                    <div className="book-title">{books.title}</div>
                    <div className="book-authors">{books.authors}</div>
                </div>
                <Rate disabled value={books.averageRating}/>
            </li>
        )
    }
}

export default BookItem;