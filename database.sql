CREATE DATABASE Hiphonic
USE Hiphonic

select * from tbl_user

CREATE TABLE tbl_user (
    UserID VARCHAR(255) PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    TagName VARCHAR(50),
    Location VARCHAR(100),
	Company VARCHAR(100),
	WebsiteLink VARCHAR(100),
	Date DATETIME DEFAULT GETDATE() 
);
drop table tbl_user
select * from Post
CREATE TABLE Post (
PostID VARCHAR(255) PRIMARY KEY,
UserID VARCHAR(255),
Content TEXT,
PostDate DATETIME,
Likes INT DEFAULT 0 ,
Comments INT DEFAULT 0,
Share INT DEFAULT 0 ,
FOREIGN KEY (UserID) REFERENCES tbl_user(UserID)
);


CREATE TABLE Comment (
CommentID VARCHAR PRIMARY KEY,
PostID VARCHAR(255),
UserID VARCHAR(255),
CommentDate DATETIME,
Content TEXT,
FOREIGN KEY (PostID) REFERENCES Post(PostID),
FOREIGN KEY (UserID) REFERENCES tbl_user(UserID)
);


-- Create Comment Table
CREATE TABLE tbl_Like (
LikeID VARCHAR PRIMARY KEY,
PostID VARCHAR(255),
UserID VARCHAR(255),
LikeDate DATETIME DEFAULT GETDATE(),
FOREIGN KEY (PostID) REFERENCES Post(PostID),
FOREIGN KEY (UserID) REFERENCES tbl_user(UserID)
);


CREATE TABLE Share (
ShareID VARCHAR PRIMARY KEY,
PostID VARCHAR(255),
UserID VARCHAR(255), 
FOREIGN KEY (PostID) REFERENCES Post(PostID),
FOREIGN KEY (UserID) REFERENCES tbl_user(UserID)
);


-- Create Friendship Table
CREATE TABLE Friendship (
FriendshipID VARCHAR(255) PRIMARY KEY,
User1ID VARCHAR(255),
User2ID VARCHAR(255),
FriendshipDate DATETIME,
FOREIGN KEY (User1ID) REFERENCES tbl_user(UserID),
FOREIGN KEY (User2ID) REFERENCES tbl_user(UserID)
);

-- Create Photo Table
CREATE TABLE Photo (
PhotoID VARCHAR(255)PRIMARY KEY,
UserID VARCHAR(255),
PhotoURL VARCHAR(255),
UploadDate DATETIME,
FOREIGN KEY (UserID) REFERENCES tbl_user(UserID)
);

-- Create tbl_group Table
CREATE TABLE tbl_group (
GroupID VARCHAR(255) PRIMARY KEY,
GroupName VARCHAR(255),
Description TEXT,
CreatedDate DATETIME
);

-- Create GroupMembers Table
CREATE TABLE GroupMembers (
GroupID VARCHAR(255),
MemberID VARCHAR(255),
PRIMARY KEY (GroupID, MemberID),
FOREIGN KEY (GroupID) REFERENCES tbl_group(GroupID),
FOREIGN KEY (MemberID) REFERENCES tbl_user(UserID)
);

-- Create Event Table
CREATE TABLE Event (
EventID VARCHAR(255) PRIMARY KEY,
EventName VARCHAR(255),
Description TEXT,
EventDate DATETIME,
Location VARCHAR(100),
EventPosterURL VARCHAR(255)
);

-- Create EventAttendee Table
CREATE TABLE EventAttendee (
EventID VARCHAR(255),
AttendeeID VARCHAR(255),
PRIMARY KEY (EventID, AttendeeID),
FOREIGN KEY (EventID) REFERENCES Event(EventID),
FOREIGN KEY (AttendeeID) REFERENCES tbl_user(UserID)
);

-- Create Message Table
CREATE TABLE Message (
MessageID VARCHAR(255) PRIMARY KEY,
SenderID VARCHAR(255),
ReceiverID VARCHAR(255),
MessageDate DATETIME,
Content TEXT,
FOREIGN KEY (SenderID) REFERENCES tbl_user(UserID),
FOREIGN KEY (ReceiverID) REFERENCES tbl_user(UserID)
);

-- Insert Dummy Data (Example for tbl_user table)
-- Dummy data for tbl_user table
INSERT INTO tbl_user (UserID, Username, Email, Password, TagName, Location)
VALUES
(1, 'user1', 'user1@example.com', 'password1', 'tag1', 'Location 1'),
(2, 'user2', 'user2@example.com', 'password2', 'tag2', 'Location 2'),
(3, 'user3', 'user3@example.com', 'password3', 'tag3', 'Location 3');
SELECT \* FROM tbl_user
-- Dummy data for Post table
INSERT INTO Post (PostID, UserID, Content, PostDate, Likes, Comments)
VALUES
(1, 1, 'Post content 1', GETDATE(), 10, 5),
(2, 2, 'Post content 2', GETDATE(), 15, 8),
(3, 3, 'Post content 3', GETDATE(), 20, 12);

-- Dummy data for Comment table
INSERT INTO Comment (CommentID, PostID, UserID, CommentDate, Content)
VALUES
(1, 1, 2, GETDATE(), 'Comment on post 1 by user 2'),
(2, 2, 3, GETDATE(), 'Comment on post 2 by user 3'),
(3, 3, 1, GETDATE(), 'Comment on post 3 by user 1');

-- Dummy data for Friendship table
INSERT INTO Friendship (FriendshipID, User1ID, User2ID, FriendshipDate)
VALUES
(1, 1, 2, GETDATE()),
(2, 1, 3, GETDATE());

-- Dummy data for Photo table
INSERT INTO Photo (PhotoID, UserID, PhotoURL, UploadDate)
VALUES
(1, 1, 'url1', GETDATE()),
(2, 2, 'url2', GETDATE()),
(3, 3, 'url3', GETDATE());

-- Dummy data for Group table
INSERT INTO tbl_group (GroupID, GroupName, Description, CreatedDate)
VALUES
(1, 'Group 1', 'Description for Group 1', GETDATE()),
(2, 'Group 2', 'Description for Group 2', GETDATE());

-- Dummy data for GroupMembers table
INSERT INTO GroupMembers (GroupID, MemberID)
VALUES
(1, 1),
(1, 2),
(2, 2),
(2, 3);

-- Dummy data for Event table
INSERT INTO Event (EventID, EventName, Description, EventDate, Location, EventPosterURL)
VALUES
(1, 'Event 1', 'Description for Event 1', GETDATE(), 'Location 1', 'poster_url_1'),
(2, 'Event 2', 'Description for Event 2', GETDATE(), 'Location 2', 'poster_url_2');

-- Dummy data for EventAttendee table
INSERT INTO EventAttendee (EventID, AttendeeID)
VALUES
(1, 1),
(1, 2),
(2, 2),
(2, 3);

-- Dummy data for Message table
INSERT INTO Message (MessageID, SenderID, ReceiverID, MessageDate, Content)
VALUES
(1, 1, 2, GETDATE(), 'Message from user 1 to user 2'),
(2, 2, 1, GETDATE(), 'Reply from user 2 to user 1'),
(3, 3, 1, GETDATE(), 'Message from user 3 to user 1');

---

## -- QUESTION 1 Friday 2/2024 ASSESSMENT

-- 1. Retrieve all posts with their comments and likes for a specific user
SELECT
p.PostID,
p.Content AS PostContent,
p.Likes AS PostLikes,
c.CommentID,
c.Content AS CommentContent,
c.CommentDate
FROM
Post p
LEFT JOIN
Comment c ON p.PostID = c.PostID
JOIN
tbl_user u ON p.UserID = u.UserID
WHERE
u.UserID = 1;

-- 2. Retrieve all friends of a user
SELECT
u.UserID,
u.Username,
u.Email,
u.TagName,
u.Location
FROM
tbl_user u
JOIN
Friendship f ON u.UserID = f.User1ID OR u.UserID = f.User2ID
WHERE
f.User1ID = 1 OR f.User2ID = 2;

-- 3. Retrieve all events attended by a specific user
SELECT
e.EventID,
e.EventName,
e.Description,
e.EventDate,
e.Location,
e.EventPosterURL
FROM
Event e
JOIN
EventAttendee ea ON e.EventID = ea.EventID
JOIN
tbl_user u ON ea.AttendeeID = u.UserID
WHERE
u.UserID = 2;

-- 4. To display group members and their details for a certain group
SELECT
u.UserID,
u.Username,
u.Email,
u.TagName,
u.Location
FROM
tbl_user u
JOIN
GroupMembers gm ON u.UserID = gm.MemberID
JOIN
tbl_group g ON gm.GroupID = g.GroupID
WHERE
g.GroupID = 2;

-- 5. Retrieve all messages between two users
SELECT
m.MessageID,
m.SenderID,
m.ReceiverID,
m.MessageDate,
m.Content
FROM
Message m
JOIN
tbl_user u1 ON m.SenderID = u1.UserID
JOIN
tbl_user u2 ON m.ReceiverID = u2.UserID
WHERE
(u1.UserID = 1 AND u2.UserID = 2) OR (u1.UserID = 2 AND u2.UserID = 1);

-- 6. To display event details and the details of their attendees
SELECT
e.EventID,
e.EventName,
e.Description AS EventDescription,
e.EventDate,
e.Location AS EventLocation,
e.EventPosterURL,
u.UserID AS AttendeeID,
u.Username AS AttendeeUsername,
u.Email AS AttendeeEmail,
u.TagName AS AttendeeTagName,
u.Location AS AttendeeLocation
FROM
Event e
JOIN
EventAttendee ea ON e.EventID = ea.EventID
JOIN
tbl_user u ON ea.AttendeeID = u.UserID;

-- 7. Retrieve all messages between two users
SELECT
m.MessageID,
m.SenderID,
m.ReceiverID,
m.MessageDate,
m.Content
FROM
Message m
JOIN
tbl_user u1 ON m.SenderID = u1.UserID
JOIN
tbl_user u2 ON m.ReceiverID = u2.UserID
WHERE
(u1.UserID = 2 AND u2.UserID = 1) OR (u1.UserID = 1 AND u2.UserID = 2);

---

## -- QUESTION 2 THIS WEEK'S ASSIGNMENT

---

## --User Table:

-- Retrieve all users
SELECT \* FROM tbl_user;

-- Retrieve user by UserID
SELECT \* FROM tbl_user WHERE UserID = 1;

-- Retrieve users in a specific location
SELECT \* FROM tbl_user WHERE Location = 'Location 3';

-- Update user information
UPDATE tbl_user
SET Username = 'Becky', Email = 'becky@gmail.com', Location = 'Japan'
WHERE UserID = 2;

-- Delete a user
DELETE FROM tbl_user WHERE UserID = 2;

---

## --Post Table:

-- Retrieve all posts
SELECT \* FROM Post;

-- Retrieve posts for a specific user
SELECT \* FROM Post WHERE UserID = 1;

-- Retrieve posts with more than 10 likes
SELECT \* FROM Post WHERE Likes > 10;

-- Update post content
UPDATE Post
SET Content = 'LIFE IN JAPAN'
WHERE PostID = 2;

-- Delete a post
DELETE FROM Post WHERE PostID = 1;

---

## --Comment Table:

-- Retrieve all comments
SELECT \* FROM Comment;

-- Retrieve comments for a specific post
SELECT \* FROM Comment WHERE PostID = 2;

-- Retrieve comments by a specific user
SELECT \* FROM Comment WHERE UserID = 2;

-- Update comment content
UPDATE Comment
SET Content = 'wow the cherry blossoms are in full bloom'
WHERE CommentID = 2;

-- Delete a comment
DELETE FROM Comment WHERE CommentID = 3;

---

## --Friendship Table:

-- Retrieve all friendships
SELECT \* FROM Friendship;

-- Retrieve friendships for a specific user
SELECT \* FROM Friendship WHERE User1ID = 1 OR 1 = 1;

-- Update friendship date
UPDATE Friendship
SET FriendshipDate = '09-02-2024'
WHERE FriendshipID = 1;

-- Delete a friendship
DELETE FROM Friendship WHERE FriendshipID = 2;

---

## --Photo Table:

-- Retrieve all photos
SELECT \* FROM Photo;

-- Retrieve photos for a specific user
SELECT \* FROM Photo WHERE UserID = 2;

-- Update photo URL
UPDATE Photo
SET PhotoURL = 'url12'
WHERE PhotoID = 1;

-- Delete a photo
DELETE FROM Photo WHERE PhotoID = 3;

---

## --Group Table:

-- Retrieve all groups
SELECT \* FROM tbl_group;

-- Retrieve a group by GroupID
SELECT \* FROM tbl_group WHERE GroupID = 2;

-- Update group information
UPDATE tbl_group
SET GroupName = 'japan lovers', Description = 'if you love japan join us '
WHERE GroupID = 2;

-- Delete a group
DELETE FROM tbl_group WHERE GroupID =1;

---

## --GroupMembers Table:

-- Retrieve all group members
SELECT \* FROM GroupMembers;

-- Retrieve members of a specific group
SELECT \* FROM GroupMembers WHERE GroupID = 1;

-- Remove a member from a group
DELETE FROM GroupMembers WHERE GroupID = 1 AND MemberID = 1;

---

## --Event Table:

-- Retrieve all events
SELECT \* FROM Event;

-- Retrieve events with a specific location
SELECT \* FROM Event WHERE Location = 'Location 2';

-- Update event information
UPDATE Event
SET EventName = 'Sakura Viewing', Description = 'watching cherry blossoms in the spring'
WHERE EventID = 2;

-- Delete an event
DELETE FROM Event WHERE EventID = 1;

---

## --EventAttendee Table:

-- Retrieve all event attendees
SELECT \* FROM EventAttendee;

-- Retrieve attendees for a specific event
SELECT \* FROM EventAttendee WHERE EventID = 1;

-- Remove an attendee from an event
DELETE FROM EventAttendee WHERE EventID = 1 AND AttendeeID = 1;

---

## --Message Table:

-- Retrieve all messages
SELECT \* FROM Message;

-- Retrieve messages between two users
SELECT \* FROM Message WHERE (SenderID = 2 AND ReceiverID = 1) OR (SenderID = 2 AND ReceiverID = 1);

-- Update message content
UPDATE Message
SET Content = 'lets go watch the sakuras together'
WHERE MessageID = 2;

-- Delete a message
DELETE FROM Message WHERE MessageID = 1;
