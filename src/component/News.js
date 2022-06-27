import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
export default class News extends Component {

  async componentDidMount(){
    this.props.setProgress(10);
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2a5ccd8953bb4cdda4a7b95fc94e0d9a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  this.setState({loading: true});
  let data = await fetch(url);
  this.props.setProgress(30);

  let parsedData= await data.json();
  this.props.setProgress(50);

  
  console.log(parsedData);
  this.props.setProgress(100);
  this.setState({articles: parsedData.articles , totalResults: parsedData.totalResults, loading:false})
}
 capitalizeFirstLetter = (string)=> {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      setProgress : 10
    };
    document.title = `NewsZilla - ${this.capitalizeFirstLetter(this.props.category)}`;
  }
  async updatePage(){
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2a5ccd8953bb4cdda4a7b95fc94e0d9a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});

    let data = await fetch(url);
    let parsedData= await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page ,
      loading: false
    })
    this.props.setProgress(100);
  }
  fetchMoreData = async () => {

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2a5ccd8953bb4cdda4a7b95fc94e0d9a&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
    this.setState({page: this.state.page +1})
    let data = await fetch(url);
    let parsedData= await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      page: this.state.page 
    })
  }
  render() {
    return (
      <>
        <h2 className="text-center my-4">NewsZilla - Top Headlines on {this.capitalizeFirstLetter(this.props.category)}</h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
          { this.state.articles.map((element) => {
            return <div className="col-md-4  my-2"key={element.url} >
              <NewsItem
                title={element.title? element.title.length <=75? element.title:element.title.slice(0,75)+"...": ""}
                description={element.description? element.title.description <=140? element.description:element.title.slice(0,140)+"...": "..."}
                imageUrl={element.urlToImage}
                url = {element.url}
                author = {element.author}
                publishedAt = {element.publishedAt}
                source = {element.source.name}
              />
            </div>;
          })}
          </div>
          </div>
         </InfiniteScroll>
         
      </>
    );
  }
}
