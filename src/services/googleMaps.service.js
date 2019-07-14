import axios from 'axios';
// var axios = Axios.create({
//     withCredentials: true
// });

export default {
    getInfo
}

function getInfo(pos) {
    return axios.get(`${_getUrl()}/getPos?lat=${pos.lat}&lng=${pos.lng}`, )
        .then(res => {
            return res.data
        })
}


function _getUrl() {

    return (process.env.NODE_ENV !== 'development') ?
        `/api/google` :
        `//localhost:3000/api/google`

}


// function getInfo(pos) {
//     console.log(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${pos.lat},${pos.lng}&radius=1500&type=park&keyword=dog&key=AIzaSyCrVxVPta_TOsFatlYL7vOx_stAJNlV8ws`)
//     var prmRes = axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${pos.lat},${pos.lng}&radius=1500&type=park&keyword=dog&key=AIzaSyCrVxVPta_TOsFatlYL7vOx_stAJNlV8ws`)
//     var prmAns = prmRes.then((res) => {
//             console.log(res)
//             return res.data;
//         })
//         .catch(err => {
//             console.log(err)
//         })
//     return prmAns;
// }