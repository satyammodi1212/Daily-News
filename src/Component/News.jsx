import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  captialLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }



  async componentDidMount() {
    this.props.setProgress(10);
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c13c7111c6fd4dafada276d358306817&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let url = `https://newsapi.org/v2/top-headlines?&category=${this.props.category}&apiKey=c13c7111c6fd4dafada276d358306817&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseDate = await data.json();
    this.props.setProgress(70);
    console.log(parseDate);
    this.setState({
      articles: parseDate.articles,
      totalArticles: parseDate.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  // previousBtn = async () => {
  //   console.log("previous Click");
  //   let url = `https://newsapi.org/v2/top-headlines?country=in&category=${
  //     this.props.category
  //   }&apiKey=c13c7111c6fd4dafada276d358306817&page=${
  //     this.state.page - 1
  //   }&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parseDate = await data.json();
  //   console.log(parseDate);
  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parseDate.articles,
  //     loading: false,
  //   });
  // };

  // handleNextClick = async () => {
  //   console.log("Next click");
  //   if (
  //     !(
  //       this.state.page + 1 >
  //       Math.ceil(this.state.totalArticles / this.props.pageSize)
  //     )
  //   ) {
  //     this.setState({ loading: true });
  //     let url = `https://newsapi.org/v2/top-headlines?country=in&category=${
  //       this.props.category
  //     }&apiKey=c13c7111c6fd4dafada276d358306817&page=${
  //       this.state.page + 1
  //     }&pageSize=${this.props.pageSize}`;
  //     let data = await fetch(url);
  //     let parseDate = await data.json();
  //     console.log(parseDate);
  //     this.setState({
  //       page: this.state.page + 1,
  //       articles: parseDate.articles,
  //       loading: false,
  //     });
  //   }
  // };
  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c13c7111c6fd4dafada276d358306817&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({ page: this.state.page + 1 })
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parseDate = await data.json();
    console.log(parseDate);
    this.setState({
      articles: this.state.articles.concat(parseDate.articles),
      totalArticles: parseDate.totalResults,
      // loading: false,
    });
  };

  render() {
    return (
      <>
        <h2 className="text-center " style={{margin: '35px 0px',marginTop: '90px'}}>DailyNews - Top Headlines {this.captialLetter(this.props.category)}</h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row mt-5">
              {this.state.articles.map((element) => {
                console.log(element);
                return (
                  <div className="col-md-4 mb-5" key={element.url}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.previousBtn}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalArticles / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            {" "}
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
