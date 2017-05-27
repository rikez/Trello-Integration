module.exports = (app) => {
    let routes = {
        reports: new app.App.Controllers.ReportsController(),
        users: new app.App.Controllers.UserController(),
        authMiddleware: new app.App.Middlewares.AuthMiddleware()
    };

    app.use('/hypnobox/*', 
        routes.authMiddleware.apiAuthentication);

    app.get('/hypnobox/reports', 
        routes.reports.getSprintColunmAndGenerateDailyReport);

    app.get('/hypnobox/reports/details/:listId', 
        routes.reports.getSprintColunmAndGenerateAndSprintReport);

    app.post('/hypnobox/reports/sprints', 
        routes.reports.generateReportOfAllSprints);

    app.post('/hypnobox/user',
        routes.users.save);
    


}