db = db.getSiblingDB('my_database')

collection = db.getCollection("goalmodels")

collection.insert(
{
    isTask: false,
    goalName: "workout",
    goalDescription: "go to gym",
    tag: "health",
    unitName: null,
    totalUnit: null,
    startDate: "2019-05-8",
    projectLength: null,
    frequency: 3,
    timePeriod: "Weekly"
}
)

collection.insert(
    {
        isTask: true,
        goalName: "write an essay",
        goalDescription: "gd",
        tag: "study",
        unitName: "page",
        totalUnit: "300",
        startDate: "2019-09-8",
        projectLength: "230",
        frequency: null,
        timePeriod: null
    }
    )

collection.insert(
    {
        isTask: true,
        goalName: "save money",
        goalDescription: "gd",
        tag: "life",
        unitName: "dollar",
        totalUnit: "5000",
        startDate: "2019-10-9",
        projectLength: "100",
        frequency: null,
        timePeriod: null
    }
    )