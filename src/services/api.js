import Axios from 'axios';

const Client = () => {
    const _client = Axios.create({
        baseURL: 'http://localhost:5000/',
        withCredentials: false
    })

    let getLists = async (source = false) => {
        try {
            let response = await _client.get('', {cancelToken: source.token});
            console.log(response);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
    };

    let addListElement = async (listId, newElement) => {
        try {
            let response = await _client.post(`lists/${listId}/elements/`, newElement);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
        }

        return false;
    };


    return {
        getLists,
        addListElement
    };
};

export default Client;