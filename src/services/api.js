import Axios from 'axios';

const Client = () => {
    const _client = Axios.create({
        baseURL: 'http://localhost:5000/',
        withCredentials: false
    })

    let getLists = async (source = false) => {
        try {
            let response = await _client.get('', {cancelToken: source.token});            
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
            return response.data;
        } catch (error) {
            console.log(error);
        }

        return false;
    };
    
    let removeListElement = async (listId, elementIndex) => {
        try {
            let response = await _client.delete(`lists/${listId}/elements/${elementIndex}`);
            return response.status;
        } catch (error) {
            console.log(error);
        }

        return false;
    }

    let deleteList = async (listId) => {
        try {
            let response = await _client.delete(`lists/${listId}/`);
            return response.data;
        } catch (error) {
            console.log(error);
        }

        return false;
    }


    return {
        getLists,
        addListElement,
        removeListElement,
        deleteList
    };
};

export default Client;