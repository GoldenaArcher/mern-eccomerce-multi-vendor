import Seller, { ISeller } from "@/models/seller.model";
import { UploadedFileWithPath } from "@/types/upload";

type SanitizedSeller = Omit<ISeller, "password">;

class SellerService {
  getSantizedSeller(seller: ISeller): SanitizedSeller {
    const sanitizedSeller = seller.toObject();
    delete sanitizedSeller.password;

    return sanitizedSeller;
  }

  async saveSeller(seller: ISeller) {
    const savedSeller = await seller.save();
    return this.getSantizedSeller(savedSeller);
  }

  async getSellerById(id: string) {
    return await Seller.findById(id);
  }

  async getSellerByEmail(email: string) {
    return await Seller.findOne({ email });
  }

  async updateSellerProfile(id: string, image: Express.Multer.File) {
    const seller = await Seller.findById(id);
    seller!.image = (image as UploadedFileWithPath).publicPath;
    return await this.saveSeller(seller!);
  }
}

export { SellerService };

export default new SellerService();
