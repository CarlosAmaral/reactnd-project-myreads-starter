import React from 'react'
import {Layout, Spin} from 'antd';
import './App.css'
import * as BooksAPI from './BooksAPI'
import HeaderComponent from "./components/Header";
import {Link, Route} from "react-router-dom";
import {Button, Tabs} from "antd";
import Search from "./components/Search";
import BookItem from "./components/BookItem";
import escapeRegExp from "escape-string-regexp";

const operations = <Link to="/search"><Button type="primary" shape="circle" icon="plus"/></Link>;
const TabPane = Tabs.TabPane;
const {Content} = Layout;

class BooksApp extends React.Component {
    state = {
        books: [],
        queryBook: [],
        query: ''
    };

    componentDidMount() {
        BooksAPI.getAll().then((book) => {
            this.setState({
                books: book
            })
        })
    }

    updateShelf = (book,newShelf) => {
        book.shelf=newShelf
        this.setState((state) => ({
            books: state.books.filter((b) => b.id !== book.id).concat([ book ])
        }))

        BooksAPI.update(book,newShelf)
    };
    userShelfBooksMatch=()=>{
        this.state.books.forEach(book => {
            var newSearchBooks=this.state.searchBooks.filter((b) => b.id !== book.id)
            if(newSearchBooks && newSearchBooks<this.state.searchBooks){
                this.setState((state) => ({
                    searchBooks: newSearchBooks.concat([ book ])
                }))
            }
        });
    };
    updateQuery = (query) => {
        this.setState({ query })
        if (query) {
            query = escapeRegExp(query)
            BooksAPI.search(query.trim()).then((books) => {
                if(!books || books.error){
                    this.setState({ searchBooks: [] })
                }else{
                    this.setState({ searchBooks: books})
                    this.userShelfBooksMatch();
                }
            })
        } else {
            this.setState({ searchBooks: [] })
        }
    };


    render() {
        const {books, queryBook, query} = this.state;

        return (
            <div className="app">
                <HeaderComponent/>
                <Route path="/search" exact render={() => (
                    <Search books={queryBook} updateBook={this.updateShelf}  query={this.query} updateQuery={this.updateQuery}/>
                )}/>
                <Route path="/" exact render={() => (
                    <Layout style={{margin: '24px 16px 0', marginTop: '20px'}}>
                        <Content>
                            <Tabs tabBarExtraContent={operations} type="card">
                                <TabPane tab="Currently Reading" key="1">
                                    <div className="bookshelf">
                                        <h2 className="bookshelf-title">Currenly Reading</h2>
                                        <div className="bookshelf-books">
                                            <ol className="books-grid">
                                                {books.filter(book => book.shelf === 'currentlyReading').map(book => (
                                                    <BookItem key={book.id} books={book} updateBook={this.update}/>
                                                ))};
                                            </ol>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tab="Want to Read" key="2">
                                    <div className="bookshelf">
                                        <h2 className="bookshelf-title">Want to Read</h2>
                                        <div className="bookshelf-books">
                                            <ol className="books-grid">
                                                {books.filter(book => book.shelf === 'wantToRead').map(book => (
                                                    <BookItem key={book.id} books={book} updateBook={this.update}/>
                                                ))};
                                            </ol>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tab="Read" key="3">
                                    <div className="bookshelf">
                                        <h2 className="bookshelf-title">Read</h2>
                                        <div className="bookshelf-books">
                                            <ol className="books-grid">
                                                {books.filter(book => book.shelf === 'read').map(book => (
                                                    <BookItem key={book.id} books={book} updateBook={this.update}/>
                                                ))};
                                            </ol>
                                        </div>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </Content>
                    </Layout>
                )}/>
            </div>
        )
    }
}

export default BooksApp