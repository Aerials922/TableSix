import * as positionService from '../service/positionService.js';
export const getPosition = async (req, res) => {
    try {
        const { username } = req.query;
        const positionData = await positionService.getPosition(username);
        res.status(200).json({ message: 'Position data retrieved successfully.', data: positionData });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving position data.', error: error.message });
    }
}