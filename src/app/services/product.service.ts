import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private selectedProduct: any;
  private selectedCategory: string = '';
  private selectedSubCategory: string = '';

  setProduct(product: any) {
    this.selectedProduct = product;
  }

  getProduct() {
    return this.selectedProduct;
  }

  setCategoryAndSubcategory(category: string, subcategory: string) {
    this.selectedCategory = category;
    this.selectedSubCategory = subcategory;
  }

  getCategoryAndSubcategory() {
    return { category: this.selectedCategory, subCategory: this.selectedSubCategory };
  }
}
