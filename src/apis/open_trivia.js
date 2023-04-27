const getTriviaData = async () => {
   const url = "https://opentdb.com/api.php?amount=10&category=10"
   const resp = await fetch(url)
   const data = await resp.json();
   return data.results;
}

export default getTriviaData;