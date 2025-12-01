import React from "react";
import { Card, Tag, Typography } from "antd";
import { StarFilled, ArrowRightOutlined } from "@ant-design/icons";
import { Project } from "../types";

const { Title, Paragraph } = Typography;

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card
      hoverable
      className="project-card"
      style={{
        height: "100%",
        border: "none",
        borderRadius: 16,
        background: "white",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        transition: "all 0.3s ease",
        overflow: "hidden",
      }}
      bodyStyle={{
        padding: 20,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow =
          "0 12px 24px rgba(255, 107, 107, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.05)";
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 12,
        }}
      >
        <div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Title
              level={4}
              style={{
                margin: 0,
                color: "var(--warm-text)",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {project.name}
              <ArrowRightOutlined
                style={{
                  fontSize: "14px",
                  color: "var(--warm-primary)",
                  transition: "transform 0.3s ease",
                }}
              />
            </Title>
          </a>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {project.featured && (
            <StarFilled
              style={{
                color: "#FFA726",
                fontSize: "18px",
                filter: "drop-shadow(0 2px 4px rgba(255, 167, 38, 0.3))",
              }}
            />
          )}
        </div>
      </div>

      <Paragraph
        type="secondary"
        style={{
          margin: "12px 0",
          flex: 1,
          color: "#8D6E63",
          lineHeight: 1.6,
        }}
      >
        {project.description}
      </Paragraph>

      <div style={{ marginTop: "auto", paddingTop: 16 }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 16,
          }}
        >
          {project.tags.slice(0, 3).map((tag) => (
            <Tag
              key={tag}
              style={{
                margin: 0,
                padding: "4px 12px",
                borderRadius: 20,
                border: "none",
                background: "linear-gradient(45deg, #FFF3E0, #FFECB3)",
                color: "#5D4037",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              {tag}
            </Tag>
          ))}
          {project.tags.length > 3 && (
            <Tag
              style={{
                background: "rgba(255, 107, 107, 0.1)",
                color: "var(--warm-primary)",
                borderRadius: 20,
                border: "none",
              }}
            >
              +{project.tags.length - 3}
            </Tag>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
