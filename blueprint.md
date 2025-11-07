# RaffleDex Frontend Development Blueprint

## Overview

This document outlines the development plan and progress for the RaffleDex frontend, a modern, production-ready interface for a decentralized raffle platform on the Celo blockchain. The goal is to create a clean, fast, and trustworthy user experience.

## Implemented Features

*   **Project Initialization:** A standard Vite + React project has been set up.
*   **Blueprint:** This `blueprint.md` file has been created to track the project's progress.
*   **Dependency Installation:** Installed `ethers`, `react-router-dom`, `tailwindcss`, `lucide-react`, and `framer-motion`.
*   **Styling & Theming:** Configured Tailwind CSS for a consistent and modern design system.
*   **Project Structure:** Established a clean project structure with dedicated folders for `components`, `pages`, `contexts`, and `contracts`.
*   **Core Components:**
    *   Created layout components: `Navbar` and `Footer`.
    *   Created application-specific components: `RaffleCard`.
*   **Web3 Integration:**
    *   Set up a `Web3Context` to manage wallet state (provider, address, chainId, and error states).
    *   Implemented the wallet connection flow in the `Navbar`.
*   **State Management:**
    *   Created a `RaffleContext` to manage the raffle contract, the list of created raffles across the application, and all raffle-related functions.
*   **Routing:**
    *   Configured `react-router-dom` with the main application routes: `/` (Landing), `/raffles` (Browse), `/create` (Create), `/raffles/:id` (Details), and a `*` catch-all for a `NotFoundPage`.
*   **Page Implementation:**
    *   **Landing Page:** Created a visually appealing entry point for the application.
    *   **Create Raffle Page:** Implemented a form to create a new raffle.
    *   **Browse Raffles Page:** Displays a list of created raffles using data from the `RaffleContext`.
    *   **Raffle Detail Page:** Fetches and displays detailed information for a specific raffle from the blockchain, including participant count, a button to enter the raffle, and winner information.
*   **Smart Contract Integration:**
    *   Included the `Raffle.json` ABI for interaction with the deployed smart contracts.
    *   Implemented contract interaction in `RaffleContext`.
    *   **Winner Selection:** Implemented the functionality for the raffle creator to pick a winner and display the winner's address.
*   **Code Refactoring:** Refactored the `useWeb3` and `useRaffle` hooks into `Web3Context` and `RaffleContext` respectively, for better code organization and maintainability.

## Final Phase: Polish and Deployment

The core functionality is complete. The final phase will focus on UI/UX enhancements and deploying the application.

### Steps:

1.  **UI/UX Polish:**
    *   Enhance the visual design of the `LandingPage.jsx` and `RaffleCard.jsx` for a more engaging user experience.
    *   Add loading states and improve error handling for better feedback.
2.  **Deployment:**
    *   Deploy the application to Firebase Hosting for public access.
