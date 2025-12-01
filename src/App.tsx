import React, { useState } from "react";
import { Layout, Input, Row, Col, Typography, Tabs } from "antd";
import {
  SearchOutlined,
  StarOutlined,
  GlobalOutlined,
  HeartOutlined,
  CoffeeOutlined,
  AppstoreOutlined,
  RocketOutlined,
  ToolOutlined,
  BookOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BankOutlined,
  CodeOutlined,
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

const iconMap: Record<string, React.ReactNode> = {
  RocketOutlined: <RocketOutlined />,
  ToolOutlined: <ToolOutlined />,
  BookOutlined: <BookOutlined />,
  UserOutlined: <UserOutlined />,
  VideoCameraOutlined: <VideoCameraOutlined />,
  BankOutlined: <BankOutlined />,
  CodeOutlined: <CodeOutlined />,
};

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
      <Content style={{ padding: "0 20px", marginTop: 40 }}>
        {/* Warm & Cozy Header */}
        <div className="warm-header" style={{ textAlign: "center" }}>
          <Title level={1} style={{ color: "white", margin: 0 }}>
            <a
              href="https://soft.io.vn"
              target="_blank"
              rel="noreferrer"
              style={{ color: "white", textDecoration: "none" }}
            >
              <HeartOutlined style={{ marginRight: 12, color: "#FFE0B2" }} />
              SOFT.io.vn
            </a>{" "}
            Hub
          </Title>
          <Paragraph
            style={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "18px",
              margin: "12px 0 0",
            }}
          >
            <CoffeeOutlined style={{ marginRight: 8 }} />
            Discover our cozy collection of tools, games, and resources
          </Paragraph>

          {/* Warm Search Box */}
          <Search
            placeholder="Find something nice to explore..."
            allowClear
            enterButton={
              <>
                <SearchOutlined /> Search
              </>
            }
            size="large"
            className="warm-search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {searchQuery ? (
          <div style={{ margin: "40px 0" }}>
            <Title level={2} style={{ color: "var(--warm-text)" }}>
              <SearchOutlined
                style={{ marginRight: 12, color: "var(--warm-primary)" }}
              />
              Found {filteredProjects.length} cozy projects
            </Title>
            <Row gutter={[20, 20]}>
              {filteredProjects.map((project) => (
                <Col xs={24} sm={12} md={8} lg={6} key={project.id}>
                  <ProjectCard project={project} />
                </Col>
              ))}
            </Row>
          </div>
        ) : (
          <>
            {/* Featured Projects with warm styling */}
            {featuredProjects.length > 0 && (
              <div style={{ margin: "40px 0" }}>
                <Title level={2} style={{ color: "var(--warm-text)" }}>
                  <StarOutlined
                    style={{
                      marginRight: 12,
                      color: "var(--warm-secondary)",
                      background: "linear-gradient(45deg, #FFA726, #FF9800)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  />
                  Featured & Lovely Projects
                </Title>
                <Paragraph
                  type="secondary"
                  style={{ fontSize: "16px", marginBottom: 24 }}
                >
                  Our hand-picked favorites, crafted with extra care
                </Paragraph>
                <Row gutter={[20, 20]}>
                  {featuredProjects.map((project) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={project.id}>
                      <ProjectCard project={project} />
                    </Col>
                  ))}
                </Row>
              </div>
            )}

            {/* Categories with warm tabs */}
            <div
              style={{
                background: "white",
                borderRadius: 20,
                padding: 24,
                boxShadow: "0 8px 32px rgba(255, 107, 107, 0.08)",
              }}
            >
              <Title
                level={3}
                style={{ color: "var(--warm-text)", marginBottom: 24 }}
              >
                Browse by Category
              </Title>

              <Tabs
                defaultActiveKey="all"
                className="warm-tabs"
                style={{ marginBottom: 24 }}
              >
                <TabPane
                  tab={
                    <span>
                      <HeartOutlined /> All Categories
                    </span>
                  }
                  key="all"
                >
                  <div style={{ marginTop: 24 }}>
                    {projectsByCategory.map(({ category, projects }) => (
                      <CategorySection
                        key={category.id}
                        category={category}
                        projects={projects}
                      />
                    ))}
                  </div>
                </TabPane>

                {categories.map((category) => (
                  <TabPane
                    tab={
                      <span>
                        {iconMap[category.icon] || <AppstoreOutlined />}{" "}
                        {category.name}
                      </span>
                    }
                    key={category.id}
                  >
                    <div style={{ marginTop: 24 }}>
                      <CategorySection
                        category={category}
                        projects={filteredProjects.filter(
                          (p) => p.category === category.id
                        )}
                      />
                    </div>
                  </TabPane>
                ))}
              </Tabs>
            </div>
          </>
        )}
      </Content>

      <Footer className="cozy-footer">
        <Paragraph
          style={{ color: "white", fontSize: "16px", marginBottom: 8 }}
        >
          <GlobalOutlined style={{ marginRight: 8 }} />
          hub.soft.io.vn © {new Date().getFullYear()}
        </Paragraph>
        <Paragraph style={{ color: "rgba(255, 255, 255, 0.8)", margin: 0 }}>
          Made with <HeartOutlined style={{ color: "#FFE0B2" }} /> from the
          SOFT.io.vn family
        </Paragraph>
      </Footer>
      <BackToTop />
    </Layout>
  );
};

export default App;
