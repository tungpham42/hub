import React from "react";
import { Row, Col, Typography, Card } from "antd";
import {
  AppstoreOutlined,
  RocketOutlined,
  ToolOutlined,
  BookOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BankOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import { Project, Category } from "../types";
import ProjectCard from "./ProjectCard";

const { Title, Paragraph } = Typography;

interface CategorySectionProps {
  category: Category;
  projects: Project[];
}

const iconMap: Record<string, React.ReactNode> = {
  RocketOutlined: <RocketOutlined />,
  ToolOutlined: <ToolOutlined />,
  BookOutlined: <BookOutlined />,
  UserOutlined: <UserOutlined />,
  VideoCameraOutlined: <VideoCameraOutlined />,
  BankOutlined: <BankOutlined />,
  CodeOutlined: <CodeOutlined />,
};

const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  projects,
}) => {
  if (projects.length === 0) return null;

  return (
    <Card
      style={{
        marginBottom: 32,
        border: "none",
        borderRadius: 16,
        boxShadow: "0 4px 20px rgba(255, 107, 107, 0.08)",
        background: "linear-gradient(135deg, #FFFFFF 0%, #FFF9F2 100%)",
        overflow: "hidden",
      }}
      bodyStyle={{ padding: 24 }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: "linear-gradient(135deg, #FF6B6B 0%, #FFA726 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 16,
          }}
        >
          <span style={{ color: "white", fontSize: "20px" }}>
            {iconMap[category.icon] || <AppstoreOutlined />}
          </span>
        </div>
        <div>
          <Title level={3} style={{ margin: 0, color: "var(--warm-text)" }}>
            {category.name}
          </Title>
          <Paragraph type="secondary" style={{ margin: "4px 0 0" }}>
            {category.description}
          </Paragraph>
        </div>
      </div>

      {projects.length > 0 ? (
        <Row gutter={[20, 20]}>
          {projects.map((project) => (
            <Col xs={24} sm={12} md={8} lg={6} key={project.id}>
              <ProjectCard project={project} />
            </Col>
          ))}
        </Row>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "40px 20px",
            background: "rgba(255, 246, 229, 0.5)",
            borderRadius: 12,
            border: "2px dashed var(--soft-border)",
          }}
        >
          <Paragraph
            style={{ color: "var(--warm-text)", fontSize: "16px", margin: 0 }}
          >
            No projects in this category yet. Check back soon! 🌟
          </Paragraph>
        </div>
      )}
    </Card>
  );
};

export default CategorySection;
