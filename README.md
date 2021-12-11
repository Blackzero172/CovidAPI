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

-------------------------------------------------------------------------------------------------------------------
now another thing i ran into was the lack of sufficient content and that forced me to come up with ways to fill up
the website with it being repetitive and that cause a few problems as well:

-------------------------------------------------------------------------------------------------------------------
Styling the Website:

now i know what you're thinking,"what do you mean styling the website", just bear with me and you'll understand,what i mean is that 
when i started styling the website i didn't have alot of content to work with and had to add a bunch of different things to fill up the page 
for example i added in the ability to change the type of the chart also a search bar helped filling up the page and probably the best feature
this site has to offer

-------------------------------------------------------------------------------------------------------------------
Adding In Responsiveness:

one of the things i encountered when adding in responsiveness was the fact that my screen had a white space on the right without an apparent reason
i tried setting everything to 100% width also tried setting them to 100% viewport widths still nothing and the solution came down to setting the overflow-x
of the body and html to hidden and that magically fixed everything

--------------------------------------------------------------------------------------------------------------------
it's funny how sometimes we try to come up with the most brilliant solutions to find out that in reality the problem nor the solution is that complicated 
and it just needed a few minutes of relaxed thinking,sometimes we need to take a break to give our mind back the ability to think straight because if we face
a complicated problem then a simple one our mind will go with complicated solutions for both and mostly that's not good
