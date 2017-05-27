module.exports = (app) => {

    let trelloService = new app.App.Services.TrelloService.TrelloService();

    function ReportsController() {

        this.getSprintColunmAndGenerateDailyReport = (req, res) => {
            trelloService.listMyProfileStats().then(response => {
                let listsOfBoards = trelloService.listAllListsOfABoard(response.idBoards[4]);
                let listBoard = trelloService.listBoardByIdWithCards(response.idBoards[4]);
                return Promise.all([listsOfBoards, listBoard]);            
            }).then(results => {
                res.json({
                    listsOfBoard: results[0],
                    boardDetails: results[1]
                })
            }).catch(err => {
                res.send(err);
            })    
        }

        this.getSprintColunmAndGenerateAndSprintReport = (req, res) => {
            if(typeof req.params.listId === 'undefined'|| !req.params.listId) {
                return res.status(400).send({
                    error: "Parâmetro lista id não pode ser nulo."
                })
            }
            trelloService.getCountTaskByList(req.params.listId).then(stories => {  
                return res.status(200).json({
                    stories: stories
                });
            }).catch(err =>{ 
                return res.status(500).json({
                    error: err
                });
            });
        }

        this.generateReportOfAllSprints = (req, res) => {

            let lists   = req.body.arrayListId.split(',');
            
            let arr     = new Array();

            if(lists.length <= 0) {
                return res.status(400).json({
                    error: "Parâmetro de listas deve ser um array"
                });
            }
            
            Promise.all([
                trelloService.getCountTaskByList(lists[0]), 
                trelloService.getCountTaskByList(lists[1]),
                trelloService.getCountTaskByList(lists[2]),
                trelloService.getCountTaskByList(lists[3]),
                trelloService.getCountTaskByList(lists[4])
            ]).then(result => {
                res.status(200).json({
                    stories: result
                });
            }).catch(err =>{ 
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
                
        }

    }

    return ReportsController;
}