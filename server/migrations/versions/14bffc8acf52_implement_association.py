"""implement association

Revision ID: 14bffc8acf52
Revises: f0a1f4b3cebd
Create Date: 2024-04-15 12:44:21.713047

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '14bffc8acf52'
down_revision = 'f0a1f4b3cebd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('suites', schema=None) as batch_op:
        batch_op.add_column(sa.Column('square_feet', sa.Integer(), nullable=True))

    with op.batch_alter_table('tenants', schema=None) as batch_op:
        batch_op.drop_constraint('fk_tenants_suite_id_suites', type_='foreignkey')
        batch_op.drop_column('suite_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tenants', schema=None) as batch_op:
        batch_op.add_column(sa.Column('suite_id', sa.INTEGER(), nullable=False))
        batch_op.create_foreign_key('fk_tenants_suite_id_suites', 'suites', ['suite_id'], ['id'])

    with op.batch_alter_table('suites', schema=None) as batch_op:
        batch_op.drop_column('square_feet')

    # ### end Alembic commands ###
