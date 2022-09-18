# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

###Context

As I had the chance to work on a project with multiple shifts and facilities, I will assume that there are no more than 50 facilities and we do not have to worry about creating a new custom id table only for the new employees that need this feature and not affect the old employees table, or having a new table with this column and replicating transactions for testing, thus, after testing, we will use the table with the new column in production

Just before doing the task I would clarify this situation. The problem is to understand the report better, maybe the employees don't make a big deal in having a nickname in the application as they want to focus on doing their job, not on doing paperwork.

Can this problem be solved only in the report by creating that id from other pieces? Combining their names, primary role etc. can solve this problem without having to change the database. This can be a good, quick POC solution that would solve a lot of time.

Another assumtion is that this nicknames are global, if an employee likes to be called "Mrs. Clippy", she will make this statement in all facilities, usually. Having a nickname in each facility is a great way to complicate the report when is being read.

This Id will be used only for reporting, so we are not going to change other queries and break something, we are going to do that in the next ticket.

I will also keep the Agent's ID in case the report is used by other processes or is already understood that way by other employees.

-------

### Ticket 1
- Acceptance criteria: Clarification are done and the POC received feedback
- Time/effort estimates: 1h
- Implementation details: Change the generate report function so we can simply use other details, already present to see if the custom id is really needed. Of course, we just don't start doing it, we ask questions before. As this task is fast it can be done during a single call, quickly. 

If that custom id remain mandatory, then we go to Ticket 2, else we update the current ticket with the simplified version of "custom id".

### Ticket 2 
- Acceptance criteria: Database is updated and the custom Id column is available
- Time/effort estimates: 1h
- Implementation details: We add the new column in the Agents table. The new custom ID column is unique, can be null (nullable) and shorter than 100 chars. Personally, I would also update it with some custom value, like First Name + Last Name + Function

### Ticket 3 
- Acceptance criteria: Update the generate report function
- Time/effort estimates: 2h
- Implementation details: Here we make a reference from that unique agent Id and retrieve the custom Id value, then we update the PDF generation part so the new column doesn't go out of the paper when printed. We also check to not print null values.

### Ticket 4
- Acceptance criteria: Update the create_Agent_Function_Which_Was_Not_Provided and update_Agent API code. Security checks are also done/
- Time/effort estimates: 2h
- Implementation details: We update the onboarding function for new agents so the person who adds a new agent can add a new nickname to it <-- this is how we explain it to the BA. In the backend it will be updating the Agent class, the repository class, adding a new path for the custom_id. This depends a lot on how the backend is configured. Maybe we use GraphQL, maybe we update the agent object and not complicate things.

### Ticket 5
- Acceptance criteria: Have the UI available
- Time/effort estimates: 1h
- Implementation details: Adding this in the add new agent interface, maybe also to other interfaces. If a user want to change it's nickname, maybe it should be done by request. Else the report might be harder to understood.

### Ticket 6
- Acceptance criteria: Write at leas an unit test 
- Time/effort estimates: 1h
- Implementation details: We need this feature to not cause problems, so we try to cover it. I know a lot of people say that they will cover everything, but usually the budget does not cover this part or the developer doesn't save time for it. Having a low threshold also motivates the developer to not forget about it.


