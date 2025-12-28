import React from "react";
import { Card, Tag, Typography, Tooltip } from "antd";
import { StarFilled, ArrowRightOutlined } from "@ant-design/icons";
import { Project } from "../types";

const { Title, Paragraph, Link } = Typography;

interface ProjectCardProps {
  project: Project;
  searchQuery?: string; // Added prop
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  searchQuery = "",
}) => {
  // Helper to highlight text
  const getHighlightedText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;

    // Escape special regex characters to prevent errors
    const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = text.split(new RegExp(`(${escapedHighlight})`, "gi"));

    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span
              key={i}
              style={{
                backgroundColor: "#ffec3d", // Warm yellow highlight
                color: "#5a3a22", // Dark brown text for contrast
                borderRadius: "2px",
                padding: "0 2px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <Card
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
      styles={{
        body: {
          padding: 0,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
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
      {/* Hero Banner - 16:9 ratio */}
      <Link href={project.url} target="_blank" rel="noopener noreferrer">
        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            borderRadius: "12px 12px 0 0",
            overflow: "hidden",
            marginBottom: 0,
            backgroundColor: "#f5f5f5",
            backgroundImage: `url(/img/${project.id}.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderBottom: "1px solid #f0f0f0",
          }}
        />
      </Link>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 12,
          padding: "0 16px",
        }}
      >
        <div>
          <Link
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
                marginTop: 12,
              }}
            >
              {getHighlightedText(project.name, searchQuery)}
              <ArrowRightOutlined
                style={{
                  fontSize: "14px",
                  color: "var(--warm-primary)",
                  transition: "transform 0.3s ease",
                }}
              />
            </Title>
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 12,
          }}
        >
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
          padding: "0 16px",
          flex: 1,
          color: "#8D6E63",
          lineHeight: 1.6,
        }}
      >
        {getHighlightedText(project.description, searchQuery)}
      </Paragraph>

      <div style={{ marginTop: "auto", paddingTop: 16 }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            padding: "0 16px 16px 16px",
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
              {getHighlightedText(tag, searchQuery)}
            </Tag>
          ))}
          {project.tags.length > 3 && (
            <Tooltip
              title={
                <div>
                  {project.tags.slice(3).map((tag, index) => (
                    <div key={index}>
                      {getHighlightedText(tag, searchQuery)}
                    </div>
                  ))}
                </div>
              }
              placement="top"
              color="white"
              overlayStyle={{
                maxWidth: 200,
              }}
              overlayInnerStyle={{
                color: "#5D4037",
                padding: "8px 12px",
              }}
            >
              <Tag
                style={{
                  background: "rgba(255, 107, 107, 0.1)",
                  color: "var(--warm-primary)",
                  borderRadius: 20,
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 8px",
                }}
              >
                +{project.tags.length - 3}
              </Tag>
            </Tooltip>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
