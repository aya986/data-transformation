import { Provider2Adapter } from "./provide2.adapter";
import axios from "axios";
import {
  Provider2ResponseDto,
  Provider2LocationDto,
  Provider2RequirementsDto,
} from "../../dto/provider2-response.dto";
import { unifiedResponseDto } from "../../dto/unified-response.dto";

jest.mock("axios");

describe("Provider2Adapter", () => {
  let provider2Adapter: Provider2Adapter;

  beforeEach(() => {
    provider2Adapter = new Provider2Adapter();
  });

  it("should fetch jobs and return unified response", async () => {
    const mockResponse: Provider2ResponseDto = {
      status: "success",
      data: {
        jobsList: {
          "job-913": {
            position: "Backend Engineer",
            location: {
              city: "Austin",
              state: "WA",
              remote: false,
            },
            compensation: {
              min: 69000,
              max: 87000,
              currency: "USD",
            },
            employer: {
              companyName: "TechCorp",
              website: "https://dataworks.com",
            },
            requirements: {
              experience: 4,
              technologies: ["Java", "Spring Boot", "AWS"],
            },
            datePosted: "2025-02-26",
          },
        },
      },
    };

    (axios.get as jest.Mock).mockResolvedValue({ data: mockResponse });

    const result: unifiedResponseDto = await provider2Adapter.fetchJobs();

    expect(result.status).toBe("success");
    expect(result.jobsList).toHaveLength(1);
    expect(result.jobsList[0].jobId).toBe("job-913");
    expect(result.jobsList[0].position).toBe("Backend Engineer");
    expect(result.jobsList[0].location).toBe("WA - Austin");
    expect(result.jobsList[0].isRemote).toBe(false);
    expect(result.jobsList[0].compensation.min).toBe(69000);
    expect(result.jobsList[0].compensation.max).toBe(87000);
    expect(result.jobsList[0].company.companyName).toBe("TechCorp");
    expect(result.jobsList[0].company.website).toBe("https://dataworks.com");
    expect(result.jobsList[0].datePosted).toBe("2025-02-26");
    expect(result.jobsList[0].requirements.experience).toBe(4);
    expect(result.jobsList[0].requirements.skils).toEqual([
      "Java",
      "Spring Boot",
      "AWS",
    ]);
  });

  it("should transform Provider2ResponseDto to unifiedResponseDto correctly", () => {
    const mockResponse: Provider2ResponseDto = {
      status: "success",
      data: {
        jobsList: {
          "job-913": {
            position: "Backend Engineer",
            location: {
              city: "Austin",
              state: "WA",
              remote: false,
            },
            compensation: {
              min: 69000,
              max: 87000,
              currency: "USD",
            },
            employer: {
              companyName: "TechCorp",
              website: "https://dataworks.com",
            },
            requirements: {
              experience: 4,
              technologies: ["Java", "Spring Boot", "AWS"],
            },
            datePosted: "2025-02-26",
          },
        },
      },
    };

    const result = provider2Adapter.unified(mockResponse);

    expect(result.status).toBe("success");
    expect(result.jobsList).toHaveLength(1);
    expect(result.jobsList[0].jobId).toBe("job-913");
    expect(result.jobsList[0].position).toBe("Backend Engineer");
    expect(result.jobsList[0].location).toBe("WA - Austin");
    expect(result.jobsList[0].isRemote).toBe(false);
    expect(result.jobsList[0].compensation.min).toBe(69000);
    expect(result.jobsList[0].compensation.max).toBe(87000);
    expect(result.jobsList[0].company.companyName).toBe("TechCorp");
    expect(result.jobsList[0].company.website).toBe("https://dataworks.com");
    expect(result.jobsList[0].datePosted).toBe("2025-02-26");
    expect(result.jobsList[0].requirements.experience).toBe(4);
    expect(result.jobsList[0].requirements.skils).toEqual([
      "Java",
      "Spring Boot",
      "AWS",
    ]);
  });

  it("should convert location correctly", () => {
    const location: Provider2LocationDto = {
      state: "New York",
      city: "NYC",
      remote: false,
    };
    const result = provider2Adapter["convertLocation"](location);

    expect(result).toBe("New York - NYC");
  });

  it("should convert requirements correctly", () => {
    const requirements: Provider2RequirementsDto = {
      experience: 5,
      technologies: ["Go", "Kubernetes"],
    };
    const result = provider2Adapter["convertRequirements"](requirements);

    expect(result.experience).toBe(5);
    expect(result.skils).toEqual(["Go", "Kubernetes"]);
  });
});
