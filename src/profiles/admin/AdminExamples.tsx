import { Button, ConfigProvider, Form, Input, Select, Space, Table, Tag, theme as antTheme } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDesignConfig } from "../../config/designConfigContext";
import { DemoStateBoundary } from "../../components/DemoStateBoundary";
import type { GoldenExampleProps } from "../../patterns/examples/exampleTypes";

interface RecordRow {
  key: string;
  name: string;
  company: string;
  fit: number;
  stage: string;
  updated: string;
}

const data: RecordRow[] = [
  { key: "1", name: "Maya Chen", company: "Northstar Labs", fit: 94, stage: "Qualified", updated: "Today" },
  { key: "2", name: "Jonas Keller", company: "Anker Works", fit: 88, stage: "Review", updated: "Yesterday" },
  { key: "3", name: "Priya Nair", company: "Fieldline", fit: 82, stage: "Qualified", updated: "2 days ago" },
  { key: "4", name: "Luis Romero", company: "Arc Systems", fit: 78, stage: "New", updated: "3 days ago" },
];

function AdminTheme({ children }: React.PropsWithChildren) {
  const { config } = useDesignConfig();
  return (
    <ConfigProvider
      theme={{
        algorithm: antTheme.defaultAlgorithm,
        token: {
          colorPrimary: "var(--color-accent)",
          colorBgLayout: "var(--color-canvas)",
          colorBgContainer: "var(--color-surface)",
          colorText: "var(--color-text)",
          colorBorder: "var(--color-border)",
          borderRadius: 6,
          controlHeight: config.density === "dense" ? 30 : config.density === "compact" ? 36 : 40,
          fontFamily: "var(--font-sans)",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export function AdminDataTableExample({ state }: GoldenExampleProps) {
  const columns: ColumnsType<RecordRow> = [
    { title: "Candidate", dataIndex: "name", key: "name", sorter: (a, b) => a.name.localeCompare(b.name) },
    { title: "Company", dataIndex: "company", key: "company", filters: [...new Set(data.map((row) => row.company))].map((value) => ({ text: value, value })) },
    { title: "Fit", dataIndex: "fit", key: "fit", align: "right", render: (fit: number) => `${fit}%`, sorter: (a, b) => a.fit - b.fit },
    { title: "Stage", dataIndex: "stage", key: "stage", render: (stage: string) => <Tag color={stage === "Qualified" ? "green" : stage === "Review" ? "gold" : "blue"}>{stage}</Tag> },
    { title: "Updated", dataIndex: "updated", key: "updated" },
    { title: "", key: "action", align: "right", render: () => <Button type="link">Open</Button> },
  ];

  return (
    <AdminTheme>
      <section className="admin-example">
        <header><div><span className="eyebrow">Administration</span><h2>Candidate records</h2><p>Ant components serve dense internal work behind a local profile boundary.</p></div><Space><Button>Export</Button><Button type="primary">Add candidate</Button></Space></header>
        <DemoStateBoundary state={state}>
          <div className="admin-filter-bar"><Input.Search placeholder="Search candidates" allowClear /><Select defaultValue="all" options={[{ value: "all", label: "All stages" }, { value: "qualified", label: "Qualified" }, { value: "review", label: "Review" }]} /><Button>More filters</Button></div>
          <Table<RecordRow> columns={columns} dataSource={data} rowSelection={{}} pagination={{ pageSize: 4, showSizeChanger: false }} size="middle" />
        </DemoStateBoundary>
      </section>
    </AdminTheme>
  );
}

export function AdminFormExample({ state }: GoldenExampleProps) {
  return (
    <AdminTheme>
      <section className="admin-example admin-form-example">
        <header><div><span className="eyebrow">Administration</span><h2>Create user</h2><p>Dense form structure uses Ant while preserving the local page contract.</p></div></header>
        <DemoStateBoundary state={state}>
          <Form layout="vertical" requiredMark="optional" initialValues={{ role: "editor", region: "eu" }}>
            <div className="admin-form-grid"><Form.Item label="Full name" name="name" rules={[{ required: true }]}><Input placeholder="e.g. Maya Chen" /></Form.Item><Form.Item label="Work email" name="email" rules={[{ required: true, type: "email" }]}><Input placeholder="maya@example.com" /></Form.Item><Form.Item label="Role" name="role"><Select options={[{ value: "editor", label: "Editor" }, { value: "admin", label: "Administrator" }, { value: "viewer", label: "Viewer" }]} /></Form.Item><Form.Item label="Data region" name="region"><Select options={[{ value: "eu", label: "European Union" }, { value: "us", label: "United States" }]} /></Form.Item></div>
            <Form.Item label="Invitation note" name="note"><Input.TextArea rows={4} placeholder="Optional context for the invitation" /></Form.Item>
            <div className="admin-form-actions"><Button>Cancel</Button><Button type="primary" htmlType="submit">Create and invite</Button></div>
          </Form>
        </DemoStateBoundary>
      </section>
    </AdminTheme>
  );
}
