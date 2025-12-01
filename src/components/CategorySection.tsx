import React from "react";
import { Row, Col, Typography, Card } from "antd";
import { Project, Category } from "../types";
import ProjectCard from "./ProjectCard";

const { Title, Paragraph } = Typography;

interface CategorySectionProps {
  category: Category;
  projects: Project[];
}

const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  projects,
}) => {
  if (projects.length === 0) return null;

  return (
    <Card style={{ marginBottom: "40px" }}>
      <Title level={3} style={{ marginBottom: "20px" }}>
        {category.name}
      </Title>
      <Paragraph type="secondary" style={{ marginBottom: "20px" }}>
        {category.description}
      </Paragraph>
      <Row gutter={[16, 16]}>
        {projects.map((project) => (
          <Col xs={24} sm={12} md={8} lg={6} key={project.id}>
            <ProjectCard project={project} />
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default CategorySection;
