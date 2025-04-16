import SellerModel, { ISeller } from "@/models/seller.model";
import { UploadedFileWithPath } from "@/types/upload";
import { ObjectId } from "mongoose";

type SanitizedSeller = Omit<ISeller, "password">;

class SellerService {
  getSantizedSeller(seller: ISeller): SanitizedSeller {
    const sanitizedSeller = seller.toObject();
    delete sanitizedSeller.password;
    sanitizedSeller.id = (seller._id as ObjectId).toString();

    return sanitizedSeller;
  }

  async saveSeller(seller: ISeller) {
    const savedSeller = await seller.save();
    return this.getSantizedSeller(savedSeller);
  }

  async getSellerById(id: string) {
    return await SellerModel.findById(id);
  }

  async getSellerByEmail(email: string) {
    return await SellerModel.findOne({ email });
  }

  async updateSellerProfile(id: string, image: Express.Multer.File) {
    const seller = await SellerModel.findById(id);
    seller!.image = (image as UploadedFileWithPath).publicPath;
    return await this.saveSeller(seller!);
  }

  async getAllSellers(
    options: {
      page?: number;
      limit?: number;
      filter?: Record<string, any>;
    } = {}
  ) {
    const { page, limit, filter = {} } = options;

    if (!page || !limit) {
      const sellers = await SellerModel.find(filter).sort({
        createdAt: -1,
      });

      return {
        sellers: sellers.map((seller) => this.getSantizedSeller(seller)),
      };
    }

    const totalSellers = await SellerModel.countDocuments(filter);
    const sellers = await SellerModel.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return {
      sellers: sellers.map((seller) => this.getSantizedSeller(seller)),
      pagination: {
        totalItems: totalSellers,
        currentPage: page,
        perPage: limit,
        totalPages: Math.ceil(totalSellers / limit),
      },
    };
  }
}

export { SellerService };

export default new SellerService();
