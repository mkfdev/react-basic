class Youtube {
  constructor(httpClient) {
    this.youtube = httpClient;
  }
  // constructor(key) {
  //   this.youtube = axios.create({
  //     baseURL: 'https://youtube.googleapis.com/youtube/v3',
  //     params: { key: key },
  //   });
  // }

  async mostPopular() {
    const response = await this.youtube.get('videos', {
      params: {
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 25,
      }
    });
    return response.data.items;
    //library자체에서 json으로 변환해줌
    //params을 url로 안적어도됨
    // const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${this.key}`, this.getRequestOptions);
    // const result = await response.json();
    // return result.items;
  }

  async search(query){
    const response = await this.youtube.get('search', {
      params: {
        part: 'snippet',
        maxResults: 25,
        type: 'video',
        q: query,
      }
    });
    return response.data.items.map(item => ({...item, id: item.id.videoId}));

    // const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=${this.key}`, this.getRequestOptions);
    // const result = await response.json();
    // return result.items.map(item => ({ ...item, id: item.id.videoId }));
  }
}

export default Youtube;