Good [morning/afternoon/evening] everyone!  We are group 6. Today, I’m excited to present out Portfolio project which is a smart investment management platform designed to help users track,and grow their wealth. 

page2:Here is the brief contents of our presentation.

page3、4：Please allow me to introduce our team firstly.

Our team is  T.6 Finance Hub and our slogan is From Broke to Millionare!!! Our goal is to empower users to take control of their investments and grow their wealth. Then we will introduce ourselves.

I‘m XXX, I come from XXX Department,I’m in charge of the backend/frontend work.

page5、6： Our project is a comprehensive portfolio management system designed to simplify stock trading and asset tracking. It’s not just a tool; it’s your personal finance hub. Let me walk you through how it works.

page7: Our user journey begins with a simple login page—new users can quickly register an account before signing in. Upon successful authentication, you'll arrive at your personalized dashboard, the central hub for all financial activities. From here, our users will be navigated to explore real-time stock repositories with detailed analytics and interactive price charts, or dive into portfolio management to track assets, review allocations, and analyze performance metrics, and they are all designed for intuitive, data-driven decision-making in one streamlined workflow.

Building on what we’ve just seen, let’s explore the exact pages of the portfolio project.

page 8: Alright, let’s start with the login page. Here, users just type in their username and password to sign in.  If you don’t have an account yet? No worries—there’s a handy link at the bottom that says, ‘Don’t have an account? Click here to sign up! Super easy.

page 9:Clicking that link takes you to the registration page. All you need to do is input a username, set a password, and type it again to confirm. Click  ‘Register,’ then you’re all set! 

page10:Once you’re logged in, you’ll land on the homepage. You can search for any stock you’re interest in or pick one from the list. And tehn just click ‘Submit’ to check it out.

page 11、12：After  pick a stock, the page shows you all the key details—like the open price, close price and more. But numbers alone can be boring, right? That’s why we added  line chart. It allows users to see how the stock’s price has changed over time.

page13:Now, let’s talk about portfolio management. In this section, you can see all your assets in one place and how much you’ve gained or lost, and how your money’s spread across different stocks and cash.

page 14(demo):Here’s a quick demo. After logging in, users land on the Home screen, where they get an overview of their investments. The Stock Repositories section offers real-time data and search functionality. Portfolio Management lets users adjust holdings, while Info Charts visualize performance. Every feature is built for clarity and action.

Next section is our tech and summary.

page 15、16：Here is  our system's architecture . At the heart of everything is our Database, where all account details and stock  data are securely stored. And it constantly exchanges information with our Backend.  The Backend also talks to External APIs for real-time stock data.What you actually see and interact with lives in our Frontend and UI. And  every button click triggers specific Internal API calls to get the data. 

page17:This is our backend setup—the engine that keeps everything running smoothly. On the left, you’ve got our core tools: **JavaScript** as our coding language, **Express** for building the framework, **Axios** to fetch data from external sources, and **MySQL2** to handle all our database conversations. 

Now, check out the right side—this is where the real organization happens. At the top, we’ve got **config** and **constant** files, they are defined as rulebooks. `mysql.js`sets up our database connection, while `user.js`define a user class.

Next, the **controllers**—these are like the managers of our app. Each one handles a specific task: `loginController`checks user credentials, `exchangeController`processes trades, and `financialController`crunches the numbers.

Below them, the **routers* make sure every request goes to the right controller. And each controller has its own matching route,it keeps things clean and efficient.

Then we’ve got the **services**—the real workhorses. They take requests from the controllers, response for these requests, and send back the results.

So, the backend workflow is : request comes in → router directs it → controller decides what to do → service does the work → and return the data. 

page 18:Alright, let's break down our frontend setup—it's super straightforward! On the left, we've got our core building blocks: HTML for structure, CSS for styling, JavaScript for all the smart functionality , and Bulma as our secret weapon for style designs. Now check out the right side,we've got key pages like login.html, register.html, and index.html,each html page is  paired with their JavaScript buddies.

page 19:For our code collaboration, we use Git - that's where we all commit our changes and keep everything organized. And to make sure we're all on the same page with tasks, we use Jira to assign who's doing what. It's like having a digital project manager that keeps us all aligned and moving forward together!

page 20:This page is showing out summary, it's all about the tech stacks we use in backend and frontend. And the most important things that we learned in this class:Tobias and the punctuations.

page 21、22：Next, let's talk about where we're heading next with this project! 

firstly, more features – We're adding more assets and more detailed infos to give users everything they need in one place.

secondly, sser Control – we'll make it easier to manage  account and adding handy new tools to save users' time.

next ,database – we'll improve security and organizing our data better so everything runs super smooth.

finally, API – we're going to get more useful data from external sources and setting up a smart caching system to speed up info loading time.

page 23: That'all about our portfolio project, thanks for your listening.
