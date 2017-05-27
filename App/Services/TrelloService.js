let Trello = require("node-trello");
let trello = new Trello(process.env.TRELLO_API_KEY, process.env.TRELLO_USER_KEY);
 
function TrelloService() {

    this.listMyProfileStats = () => {
        return new Promise((resolve, reject) => {
            trello.get("/1/members/me", (err, data) => {
                if (err) return reject(err);
                return resolve(data);
            });
        });
    }

    this.listAllListsOfABoard = (boardId) => {
        return new Promise((resolve, reject) => {
            trello.get(`/1/boards/${boardId}/lists`, (err, data) => {
                if (err) return reject(err);
                return resolve(data);
            });
        });
    }
    

    this.listBoardById = (boardId) => {
        return new Promise((resolve, reject) => {
            trello.get(`/1/boards/${boardId}`, {lists:"open"}, (err, data) => {
                if (err) return reject(err);
                return resolve(data);
            });
        });
    }

    this.listBoardByIdWithCards = (boardId) => {
        return new Promise((resolve, reject) => {
            trello.get(`/1/boards/${boardId}/cards`,  (err, data) => {
                if(err) return reject(err);
                return resolve({
                    numberOfCardsInBoard: data.length,
                    data: data
                });
            });
         });
    }

    this.getCountTaskByList = (listId) => {
        console.log(listId);
        let pointsInSprint = [];
        let tasksNumber = {
            story: {
                pointsAndIds: [],
            }
        };
        return new Promise((resolve, reject) => {
            trello.get(`/1/lists/${listId}/cards`,  (err, data) => {
                if(err) return reject(err);

                data.filter(function(values) {
                    if(/\((\d+)\)/.test(values['name']) && /(#\d+)/.exec(values['name'])) {
                        let rgxPtsSprint = /\((\d+)\)/.exec(values['name']);
                        let rgxTasksNumbers = /(#\d+)/.exec(values['name']);
                        tasksNumber['story']['pointsAndIds'].push(
                        rgxPtsSprint[1] + ' - ' 
                        + rgxTasksNumbers[1] + ' - ' 
                        + new Date(values['dateLastActivity']).toLocaleString());
                        pointsInSprint.push(rgxPtsSprint[1]);
                    }
                });

                let sumCallback = pointsInSprint.reduce((acm, curVal) => {
                    return parseInt(acm) + parseInt(curVal);
                })
                
                resolve({
                    qtdStoriesInSprint: data.length,
                    pointsInSprint: sumCallback,
                    taskNumbers: tasksNumber,
                    //stories: data
                });
                //resolve({numberOfStories: data.length, listName: });
            });
        })
    }


}

module.exports = {
    TrelloService
}