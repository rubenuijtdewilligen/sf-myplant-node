import type { MyPlantClient } from "../client.js";
import type { Address, UpdateAddressResponse } from "../types.js";

export class AddressFlow {
  private client: MyPlantClient;

  constructor(client: MyPlantClient) {
    this.client = client;
  }

  /**
   * Retrieves the authenticated user's address from Conscribo.
   */
  public async get(): Promise<Address> {
    return this.client.request<Address>("/address");
  }

  /**
   * Updates the authenticated user's address in Conscribo.
   */
  public async update(address: Address): Promise<UpdateAddressResponse> {
    return this.client.request<UpdateAddressResponse>("/address", {
      method: "PATCH",
      body: JSON.stringify(address),
    });
  }
}
