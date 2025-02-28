import { Provider1Adapter } from "./provide1.adapter";

import {
  Provider1ResponseDto,
  Provider1JobDto,
  Provider1JobDetailsDto,
  Provider1CompanyDto,
} from "../../dto/provider1-response.dto";
import { unifiedResponseDto } from "../../dto/unified-response.dto";
import axios from "axios";

jest.mock("axios");

describe("Provider1Adapter", () => {
  let provider1Adapter: Provider1Adapter;

  beforeEach(() => {
    provider1Adapter = new Provider1Adapter();
  });

  it("should fetch jobs and return unified response", async () => {
    const mockResponse: Provider1ResponseDto = {
      metadata: {
        requestId: "req-qmohdzuw1",
        timestamp: "2025-02-28T12:59:00.484Z",
      },
      jobs: [
        {
          jobId: "P1-631",
          title: "Software Engineer",
          details: {
            location: "San Francisco, CA",
            type: "Contract",
            salaryRange: "$71k - $118k",
          },
          company: {
            name: "DataWorks",
            industry: "Technology",
          },
          skills: ["HTML", "CSS", "Vue.js"],
          postedDate: "2025-02-24T13:41:17.871Z",
        },
      ],
    };

    (axios.get as jest.Mock).mockResolvedValue({ data: mockResponse });

    const result: unifiedResponseDto = await provider1Adapter.fetchJobs();
    
    expect(result.status).toBe("success");
    expect(result.jobsList).toHaveLength(1);
    
    expect(result.jobsList[0].jobId).toBe("P1-631");
    expect(result.jobsList[0].compensation.min).toBe(71000);
    expect(result.jobsList[0].compensation.max).toBe(118000);
    expect(result.jobsList[0].company.companyName).toBe("DataWorks");
    expect(result.jobsList[0].company.industry).toBe("Technology");
  });

  it("should transform Provider1ResponseDto to unifiedResponseDto correctly", () => {
    const mockJobDetails: Provider1JobDetailsDto = {
      location: "San Francisco, CA",
      type: "Contract",
      salaryRange: "$71k - $118k"
    };

    const mockCompany: Provider1CompanyDto = {
      name: "DataWorks",
      industry: "Technology"
    };

    const mockJob: Provider1JobDto = {
      jobId: "P1-631",
      title: "Software Engineer",
      details: mockJobDetails,
      company: mockCompany,
      skills: [
        "HTML",
        "CSS",
        "Vue.js"],
      postedDate: "2025-02-24T13:41:17.871Z",
    };

    const mockResponse: Provider1ResponseDto = {
      metadata: { requestId: "req-qmohdzuw1", timestamp: "2025-02-28T12:59:00.484Z" },
      jobs: [mockJob],
    };

    const result = provider1Adapter.unified(mockResponse);

    expect(result.status).toBe("success");
    expect(result.jobsList[0].jobId).toBe("P1-631");
    expect(result.jobsList[0].position).toBe("Software Engineer");
    expect(result.jobsList[0].location).toBe("San Francisco, CA");
    expect(result.jobsList[0].compensation.min).toBe(71000);
    expect(result.jobsList[0].compensation.max).toBe(118000);
    expect(result.jobsList[0].company.companyName).toBe("DataWorks");
  });

  it("should convert salary range correctly", () => {
    const salaryRange = "$93k - $122k";
    const result = provider1Adapter["convertCompensation"](salaryRange);

    expect(result.min).toBe(93000);
    expect(result.max).toBe(122000);
    expect(result.currency).toBe("USD");
  });

  it("should convert company data correctly", () => {
    const company: Provider1CompanyDto = {
      name: "TechCorp",
      industry: "IT",
    };

    const result = provider1Adapter["convertCompany"](company);

    expect(result.companyName).toBe("TechCorp");
    expect(result.industry).toBe("IT");
  });

  it("should convert requirements correctly", () => {
    const skills = ["JavaScript", "Node.js"];
    const result = provider1Adapter["convertRequirements"](skills);

    expect(result.experience).toBe(0);
    expect(result.skils).toEqual(skills);
  });
});
