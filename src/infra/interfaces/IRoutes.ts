import express from 'express';

export default interface IRoutes {
    register(): void;
    router: express.Router; 
    url: string;
}