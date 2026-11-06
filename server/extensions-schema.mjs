export function extensionsSchema(db){db.exec(`
CREATE TABLE IF NOT EXISTS publication_job(id TEXT PRIMARY KEY,record_id TEXT NOT NULL REFERENCES record(id),version INTEGER NOT NULL,due_at TEXT NOT NULL,approved_by TEXT NOT NULL,state TEXT NOT NULL DEFAULT 'pending',reason TEXT NOT NULL,error TEXT);
CREATE TABLE IF NOT EXISTS field_evidence(id TEXT PRIMARY KEY,record_id TEXT REFERENCES record(id),field_path TEXT NOT NULL,source_url TEXT NOT NULL,effective_session TEXT NOT NULL,checked_at TEXT NOT NULL,reviewer_id TEXT NOT NULL REFERENCES users(id),note TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS member_group(id TEXT PRIMARY KEY,title TEXT NOT NULL,description TEXT NOT NULL,institution_id TEXT REFERENCES institution(id),owner_id TEXT NOT NULL REFERENCES users(id),created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS group_member(group_id TEXT REFERENCES member_group(id),user_id TEXT REFERENCES users(id),joined_at TEXT NOT NULL,PRIMARY KEY(group_id,user_id));
CREATE TABLE IF NOT EXISTS post_group(post_id TEXT PRIMARY KEY REFERENCES post(id),group_id TEXT NOT NULL REFERENCES member_group(id));
CREATE TABLE IF NOT EXISTS accepted_answer(post_id TEXT PRIMARY KEY REFERENCES post(id),comment_id TEXT NOT NULL REFERENCES comment(id),accepted_by TEXT NOT NULL REFERENCES users(id),accepted_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS follow(user_id TEXT REFERENCES users(id),target_type TEXT NOT NULL,target_id TEXT NOT NULL,PRIMARY KEY(user_id,target_type,target_id));
CREATE TABLE IF NOT EXISTS review_dimension(review_id TEXT REFERENCES review(id),dimension TEXT NOT NULL,score INTEGER NOT NULL CHECK(score BETWEEN 1 AND 5),PRIMARY KEY(review_id,dimension));
CREATE TABLE IF NOT EXISTS application_checklist(user_id TEXT REFERENCES users(id),admission_id TEXT REFERENCES record(id),items TEXT NOT NULL,updated_at TEXT NOT NULL,PRIMARY KEY(user_id,admission_id));
CREATE TABLE IF NOT EXISTS alert_subscription(user_id TEXT REFERENCES users(id),institution_id TEXT REFERENCES institution(id),channel TEXT NOT NULL DEFAULT 'in_app',created_at TEXT NOT NULL,PRIMARY KEY(user_id,institution_id,channel));
CREATE TABLE IF NOT EXISTS outbox(id TEXT PRIMARY KEY,user_id TEXT REFERENCES users(id),subject TEXT NOT NULL,body TEXT NOT NULL,href TEXT NOT NULL,state TEXT NOT NULL DEFAULT 'pending',attempts INTEGER NOT NULL DEFAULT 0,created_at TEXT NOT NULL,sent_at TEXT);
CREATE TABLE IF NOT EXISTS privacy_request(id TEXT PRIMARY KEY,user_id TEXT REFERENCES users(id),type TEXT NOT NULL,body TEXT NOT NULL,state TEXT NOT NULL DEFAULT 'open',created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS representative_grant(id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),institution_id TEXT NOT NULL REFERENCES institution(id),report_id TEXT NOT NULL REFERENCES report(id),scope TEXT NOT NULL,expires_at TEXT NOT NULL,approved_by TEXT NOT NULL REFERENCES users(id),source_url TEXT NOT NULL,revoked_at TEXT);
CREATE VIRTUAL TABLE IF NOT EXISTS search_index USING fts5(entity_id UNINDEXED,entity_type UNINDEXED,institution_id UNINDEXED,title,body,tokenize='unicode61');
`);}
