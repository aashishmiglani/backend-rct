import * as ContactModel from '../models/contactModel.js';

export const createContact = async (req, res) => {
    const { name, phone } = req.body;

    if (!name || !phone) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const { data, error } = await ContactModel.createContact({ name, phone });

        if (error) return res.status(500).json({ error: error.message });

        res.json({ success: true, data });
    } catch (err) {
        console.error("🔥 Server error:", err.message);
        res.status(500).json({ error: "Server error" });
    }
};

export const getAllContacts = async (req, res) => {
    const { search } = req.query;

    try {
        const { data, error } = await ContactModel.getAllContacts(search);

        if (error) return res.status(500).json({ error: error.message });

        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

export const getContactById = async (req, res) => {
    const { id } = req.params;

    try {
        const { data, error } = await ContactModel.getContactById(id);

        if (error) return res.status(404).json({ error: "Contact not found" });

        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

export const updateContact = async (req, res) => {
    const { id } = req.params;
    const { name, phone } = req.body;

    try {
        const { data, error } = await ContactModel.updateContact(id, { name, phone });

        if (error) return res.status(500).json({ error: error.message });

        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

export const deleteContact = async (req, res) => {
    const { id } = req.params;

    try {
        const { error } = await ContactModel.deleteContact(id);

        if (error) return res.status(500).json({ error: error.message });

        res.json({ success: true, message: "Contact deleted" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};
