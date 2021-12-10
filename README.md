# CovidAPI
the hardest part about this project was setting up the fundemenatal API Calls

more specifically when i started to combine 2 API together i ran into a couple of problems first being:

------------------------------------------------------------------------------------------------------------------
the Generate Chart function ran first:

the first problem was that my generate chart function ran before i had the time to gather the neccesary information

which lead it to generating an empty chart, my solution initially was to place the generate chart function call inside

the promise resolve callback with an if statemant that would run only if im on the last item,however i came up with another solution

to fix this problem and help me in the future that solution is to gather information on all the regions when the website loads

and store that information into objects so that i can use that information later on without the need to call on the API again

and without needing to wait for a response

------------------------------------------------------------------------------------------------------------------
Implementing a Search Bar:

now when i first thought of implementing a search bar it seemed easy and at first it was everything worked fine until i started

to run into unexpected bugs one of them being that the search results popup on every keypress which is something that is resource

consuming and so my solution was to add a timeout on the calling of the display search results function and that worked like a charm

