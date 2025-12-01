import React, { useState } from "react";
import { Layout, Input, Row, Col, Typography, Tabs } from "antd";
import {
  SearchOutlined,
  StarOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import ProjectCard from "./components/ProjectCard";
import CategorySection from "./components/CategorySection";
import BackToTop from "./components/BackToTop";
import { projects, categories } from "./data/projects";
import "./App.css";

const { Content, Footer } = Layout;
const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = searchQuery
    ? projects.filter(
        (project) =>
          project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          project.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : projects;

  const featuredProjects = projects.filter((p) => p.featured);
  const projectsByCategory = categories.map((category) => ({
    category,
    projects: filteredProjects.filter((p) => p.category === category.id),
  }));

  return (
    <Layout className="layout">
      <Content style={{ padding: "0 50px", marginTop: 64 }}>
        <div style={{ margin: "20px 0", textAlign: "center" }}>
          <Title level={1}>SOFT.io.vn Hub</Title>
          <Paragraph type="secondary" style={{ fontSize: "18px" }}>
            Discover our collection of tools, games, and resources
          </Paragraph>

          <Search
            placeholder="Search projects..."
            allowClear
            enterButton="Search"
            size="large"
            prefix={<SearchOutlined />}
            style={{ maxWidth: "600px", margin: "30px auto" }}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {searchQuery ? (
          <div style={{ margin: "40px 0" }}>
            <Title level={2}>Search Results ({filteredProjects.length})</Title>
            <Row gutter={[16, 16]}>
              {filteredProjects.map((project) => (
                <Col xs={24} sm={12} md={8} lg={6} key={project.id}>
                  <ProjectCard project={project} />
                </Col>
              ))}
            </Row>
          </div>
        ) : (
          <>
            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
              <div style={{ margin: "40px 0" }}>
                <Title level={2}>
                  <StarOutlined /> Featured Projects
                </Title>
                <Row gutter={[16, 16]}>
                  {featuredProjects.map((project) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={project.id}>
                      <ProjectCard project={project} />
                    </Col>
                  ))}
                </Row>
              </div>
            )}

            {/* Categories */}
            <Tabs defaultActiveKey="all" style={{ marginBottom: "40px" }}>
              <TabPane tab="All Categories" key="all">
                {projectsByCategory.map(({ category, projects }) => (
                  <CategorySection
                    key={category.id}
                    category={category}
                    projects={projects}
                  />
                ))}
              </TabPane>

              {categories.map((category) => (
                <TabPane tab={category.name} key={category.id}>
                  <CategorySection
                    category={category}
                    projects={filteredProjects.filter(
                      (p) => p.category === category.id
                    )}
                  />
                </TabPane>
              ))}
            </Tabs>
          </>
        )}
      </Content>

      <Footer style={{ textAlign: "center" }}>
        <Paragraph>
          <GlobalOutlined /> hub.soft.io.vn © {new Date().getFullYear()}
        </Paragraph>
        <Paragraph type="secondary">
          Collection of tools and resources from SOFT.io.vn ecosystem
        </Paragraph>
      </Footer>
      <BackToTop />
    </Layout>
  );
};

export default App;
