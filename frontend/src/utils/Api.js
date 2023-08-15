class Api{
    constructor(config){
        this._url=config.url;
        this._headers=config.headers
    }
    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }
    getInitialCards(){
        return fetch(`${this._url}/cards`, {
            method:"GET",
            credentials: 'include',
            headers:this._headers
        }).then((res)=>{
            return this._getResponseData(res)
        })
    }
    getUserData(){
        return fetch(`${this._url}/users/me`, {
            method:"GET",
            credentials: 'include',
            headers:this._headers
        }).then((res)=>{
            return this._getResponseData(res)
        })       
    }
    sendDataProfile(name,job){
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
              name: name,
              about: job
            })
          }).then((res)=>{
            return this._getResponseData(res)
        })
    }
    createMestoCard(name,link){
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
              name: name,
              link: link
            })
          }).then((res)=>{
            return this._getResponseData(res)
        })
          
    }
    deleteCard(cardId, owner){
        return fetch(`${this._url}/cards/${cardId}`, {
            method:"DELETE",
            credentials: 'include',
            headers:this._headers,
            body: JSON.stringify({
                owner: owner,
              })
        }).then((res)=>{
            return this._getResponseData(res)
        })}
    changeLikeCardStatus(cardId,isMyLike){
        if (isMyLike){
            return this._likeDelete(cardId)
        }
        else {
            return this._likeAdd(cardId)
        }
    }
    _likeAdd(cardId){
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method:"PUT",
            credentials: 'include',
            headers:this._headers,

        }).then((res)=>{
            return this._getResponseData(res)
        })
    }
    _likeDelete(cardId){
        console.log(cardId)
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method:"DELETE",
            credentials: 'include',
            headers:this._headers
        }).then((res)=>{
            return this._getResponseData(res)
        })
    }
    avatarProfile(link){
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({
              avatar:link
            })
          }).then((res)=>{
            return this._getResponseData(res)
        })
    }
    exitPage(){
        return fetch(`${this._url}/loginout`, {
            method: "GET",
            credentials: 'include', // <--- YOU NEED THIS LINE
            headers: this._headers,
          }).then((res)=>{
            return this._getResponseData(res)
        })
    }
}
export const api = new Api({
    url:'http://localhost:4000',
    headers:{ 
      authorization: '1c8d4f00-a15b-43e6-a0ec-40bf4915d387',
      'Content-Type': 'application/json'}
  })