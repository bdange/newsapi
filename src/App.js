import React, { useState, useEffect } from 'react';

const App = () => {
  //state
  const [info, setInfo] = useState([]);
  const [repos, setRepos] = useState([]);
  const [searchUser, setSearchUser] = useState('bdange');
  const [url, setUrl] = useState(
    'https://api.github.com/users/bdange'
  );
  const [reposURL, setReposURL] = useState(
    'https://api.github.com/users/bdange/repos'
  )
  const [loading, setLoading] = useState(false);
  //fetch news
  const fetchInfo = () => {
    // set loading true
    setLoading(true);
    fetch(url)
      .then((result) => result.json())
      // .then((data) => console.log(data));
      .then((data) => (setInfo(data), setLoading(false)))
      .catch((error) => console.log(error));
  };

  const fetchRepos = () => {
    // set loading true
    setLoading(true);
    fetch(reposURL)
      .then((result) => result.json())
      // .then((data) => console.log(data));
      .then((data) => (setRepos(data), setLoading(false)))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchInfo();
    fetchRepos();
  }, [url, reposURL]);

  const handleChange = (e) => {
    setSearchUser(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(`https://api.github.com/users/${searchUser}`);
    setReposURL(`https://api.github.com/users/${searchUser}/repos`);
  };

  const showLoading = () => (loading ? <h2>Loading...</h2> : '');

  const searchForm = () => (
    <form className="block ml" onSubmit={handleSubmit}>
          <label className="font mr">Enter a GitHub username to see their repository</label>
          <input type='text' value={searchUser} onChange={handleChange} />
      <button>Search</button>
    </form>
  );

  const showNews = () => {
    console.log("This is info", info)
    return (
    <div className="profile align">
    
      <div className="block mb">

      <a href={info.html_url} target="_blank" rel="noopener noreferrer">
    <label className="mrBig">{info.login}</label>
    <img src={info.avatar_url} />
    </a>
      </div>
    
    </div>
    )
  };

  const showRepos = () => {
    console.log('repos', repos)
    return repos.map((n, i) => (
      <div className="repositories">
        <div className="details">
        <a href={n.html_url} target="_blank" rel="noopener noreferrer">
        <h4 key={i}>{n.name}</h4>
        </a>
     <p>{n.description}</p>
     </div>
      </div>
    ));
  };

  return (
    <div className="main">
      <h1 className="font align">Welcome to your GitHub search Engine</h1>
      {searchForm()}
      {showLoading()}
      {showNews()}
      {showRepos()}
    </div>
  );
};

export default App;
