import type { MyPlantClient } from "../client.js";
import type {
  Activity,
  ActivitySignup,
  ActivitySignupResponse,
  RemoveRegistration,
  SingleActivity,
} from "../types.js";

interface ActivitiesListResponse {
  success?: boolean;
  data?: Activity[];
  activities?: Activity[];
}

export class ActivitiesFlow {
  private client: MyPlantClient;

  constructor(client: MyPlantClient) {
    this.client = client;
  }

  /**
   * Retrieves all upcoming activities along with their signup forms and user status.
   */
  public async getAll(): Promise<Activity[]> {
    const response =
      await this.client.request<ActivitiesListResponse>("/activities");
    return response.data ?? response.activities ?? [];
  }

  /**
   * Retrieves full details, participants, form questions, and user status for a single activity.
   */
  public async getById(activityId: string): Promise<SingleActivity> {
    return this.client.request<SingleActivity>(`/activities/${activityId}`);
  }

  /**
   * Signs up or joins the waitlist for a specific activity.
   */
  public async join(
    activityId: string,
    info: ActivitySignup,
  ): Promise<ActivitySignupResponse> {
    return this.client.request<ActivitySignupResponse>(
      `/activities/${activityId}`,
      {
        method: "POST",
        body: JSON.stringify({
          type: info.type,
          answers: info.answers ?? {},
        }),
      },
    );
  }

  /**
   * Removes an existing signup or waitlist registration for an activity.
   */
  public async remove(
    info: RemoveRegistration,
  ): Promise<{ success: boolean; message?: string }> {
    return this.client.request<{ success: boolean; message?: string }>(
      `/activities/${info.activityId}`,
      {
        method: "DELETE",
        body: JSON.stringify({
          type: info.type ?? "signup",
        }),
      },
    );
  }
}
