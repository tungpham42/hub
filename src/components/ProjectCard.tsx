import React from "react";
import { Card, Tag, Typography } from "antd";
import { StarFilled } from "@ant-design/icons";
import { Project } from "../types";

const { Title, Paragraph } = Typography;

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card hoverable className="project-card" style={{ height: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <a href={project.url} target="_blank" rel="noopener noreferrer">
          <Title level={4} style={{ margin: 0 }}>
            {project.name}
          </Title>
        </a>
        {project.featured && <StarFilled style={{ color: "#faad14" }} />}
      </div>

      <Paragraph type="secondary" style={{ margin: "10px 0" }}>
        {project.description}
      </Paragraph>

      <div style={{ marginTop: "auto" }}>
        {project.tags.slice(0, 3).map((tag) => (
          <Tag key={tag} style={{ margin: "2px" }}>
            {tag}
          </Tag>
        ))}
      </div>
    </Card>
  );
};

export default ProjectCard;
