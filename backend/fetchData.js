async function fetchData() {
    const response = await fetch('https://seanallen-course-backend.herokuapp.com/swiftui-fundamentals/appetizers')
    return response.json();
}


module.exports = fetchData;