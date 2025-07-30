import * as exchangeService from '../service/exchangeService.js';

export const buyingIn = async (req, res) => {
    try{
        const { username, ticker, amount } = req.body;
        const result = await exchangeService.buyingIn(username, ticker, amount);
        res.status(200).json({message: 'Buying in successful.', data: result});
    }catch (error) {
        console.error('Error during buying in:', error);
        res.status(500).json({ message: 'Error during buying in.', error: error.message });
    }
};
export const buyingOut = async (req, res) => {
    try{
        const { username, ticker, amount } = req.body;
        const result = await exchangeService.buyingOut(username, ticker, amount);
        res.status(200).json({message: 'Buying out successful.', data: result});
    }catch (error) {
        console.error('Error during buying out:', error);
        res.status(500).json({ message: 'Error during buying out.', error: error.message });
    }
}