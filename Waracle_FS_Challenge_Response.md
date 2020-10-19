## The Challenge

**Here we go…**
-   Source control - Git, GitHub
-   Build & package tooling - npm/ npx
-   Framework choices - Next.js (based on React, Webpack & Babel)
-   Deployment - Vercel
-   Resilience - built into the code
-   Backend technologies - Prisma, SQLIte
-   Knowledge of agile/ iterative process - see commits

## The app

**S1 - As a cake lover, I can view all the cakes that have been submitted so [that] I can drool [over] their awesome tastiness**

*Acceptance Criteria*
*1.  A simple list showing the image and name of the cake and nothing else*

Implementation Notes
- Acceptance criterion met 
- Framework selection
	- Next.js - easy to use/ deploy, new technology to me - challenging/ fun to experiment with
- Backend selection
	- Prisma (open source database toolkit)
		- promising technology (ORM replacement)
		- have previously reviewed in Next.js-based RESTful API example code
	- SQLite3
		- simple database all that is required for the challenge
		- works well with Prisma
---

**S2 - As a cake lover, I can submit cakes that I like so everyone can drool at my tasty suggestions.**

*Acceptance Criteria*
- *I should be able add a cake from the list of all cakes view*
- *I should be taken to a view where I am able to specify the name a comment and a yum factor between 1 and 5.*
- *I should be returned back to the list of cakes after submitting.*
- *I should not be able to successfully submit an invalid form. Instead a relevant error message should be displayed below all invalid form fields.*

Implementation Notes
- Acceptance criteria met 
- ‘Add’ button in form disabled until all form validation criteria have been satisfied
- Only ‘name’ field displays error message (if name is duplicate)
- ‘Comment’ field displays field requirements as placeholder, will enable ‘Add’ button where < 5 characters (where other validation criteria are satisfied), and is limited to 200 characters - preventing incorrect data being entered in the first instance is better than retrospective error messages

---
  
**S3 - As a cake lover I can view details about a single cake so that I can see the comment made against it.**

*Acceptance Criteria*
1.  *I can select/click or tap any cake in the list and be taken to a view where I can see the comment/review made.*
2.  *I should be able to close or navigate back to the list of cakes once I’ve read the cake details.*

Implementation Notes
- Acceptance criteria met

---

**Technical aspects / constraints and goals**

A full RESTful API was **not** implemented - only those endpoints required to satisfy the stories S1 to S3 were defined.

Extending the application to include the ability to update the details of a cake and delete a cake (possible restricted by user - only the user who defined the post can delete it) would require PUT and DELETE endpoints respectively.

These additional endpoints would, again, be facilitated through Prisma.

**Improvements to solution**
- Improve responsiveness across mobile/ desktop browsers, through CSS styling
- Add progressive web app features
