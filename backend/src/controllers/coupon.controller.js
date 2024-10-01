import { Coupon } from "../models/model.js";

export const createCoupon = async (req, res) => {
    try {
        if(req.user.vendorId) {
            req.body.vendor = req?.user?.vendorId;
        }
        const coupon = new Coupon(req.body);
        await coupon.save();
        res.status(201).json({ message: "Coupon created successfully!", data: coupon });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.status(200).json({ data: coupons });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.code);
        if (!coupon) return res.status(404).json({ message: "Coupon not found" });
        res.json({ data: coupon });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getMyVendorCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find({ user: req.user.vendorId});
        res.status(200).json({ data: coupons });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!coupon) return res.status(404).json({ message: "Coupon not found" });
        res.json({ message: "Coupon updated successfully!", data: coupon });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findByIdAndDelete(req.params.id);
        if (!coupon) return res.status(404).json({ message: "Coupon not found" });
        res.json({ message: "Coupon deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

