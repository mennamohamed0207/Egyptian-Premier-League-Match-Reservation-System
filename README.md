# Egyptian Premier League Match Reservation System

## Overview

The **Egyptian Premier League Match Reservation System** is an online platform designed to manage and automate ticket reservations for football matches in the Egyptian Premier League. The system allows fans to view match details and reserve specific seats for future matches, while EFA management can create, modify, and track matches, as well as manage reservations.

## Business Model

The system supports four key user types, each with specific permissions and responsibilities:

- **Site Administrator**: Manages user creation and assigns authorities.
- **EFA Management**: Responsible for creating and modifying match events.
- **Customers (Fans)**: Can view match details and reserve seats for matches.
- **Guests**: Unregistered users who can view match details and register/login.

## System Features

### Site Administrator
- **F1**: Approve new users as authorities.
- **F2**: Remove an existing user.

### EFA Managers
- **F3**: Create new match events with all details.
- **F4**: Edit match details.
- **F5**: Add new stadiums with seating information.
- **F6**: View match details.
- **F7**: View vacant/reserved seats for each match.

### Customers (Fans)
- **F8**: Edit personal data (except username and email).
- **F9**: View match details and vacant seats.
- **F10**: Reserve vacant seats for future matches.
- **F11**: Cancel a reservation (up to 3 days before the match).

### Guests
- **F12**: Register a new account.
- **F13**: Log in as an existing user.
- **F14**: View match details.

## Match Details

Each match contains the following details:
- **Home Team**: One of 18 teams.
- **Away Team**: One of 18 teams (cannot be the same as the home team).
- **Match Venue**: One of the approved stadiums.
- **Date & Time**.
- **Main Referee**.
- **Two Linesmen**.

## Functionality Requirements

- **User Account Management**: Site administrators can approve and remove users. EFA managers can create and edit matches, while customers can manage their personal data and make reservations.
- **Seat Reservation System**: Customers can reserve seats from a graphical view of the stadium's seating arrangement. Seats should be updated in real time if another user reserves a seat.
- **Reservation Conflicts**: Only one user can reserve a specific seat at a time. If two users try to reserve the same seat, the system should reserve it for only one of them.
- **Automatic Seat Status Update**: Seat statuses (vacant/reserved) are updated in real-time when viewed by the user.

## Stadium Shape and Seat Reservation

- **Stadium Shape**: The VIP lounge where fans are seated has a rectangular shape, with defined rows and seats per row.
- **Graphical Seat Reservation**: Users should be able to visually see the entire seating arrangement and the status of each seat (vacant/reserved).

