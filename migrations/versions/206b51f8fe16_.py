"""empty message

Revision ID: 206b51f8fe16
Revises: 
Create Date: 2021-06-14 16:12:32.295858

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '206b51f8fe16'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('chat',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    op.create_table('traveler',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('_password', sa.String(), nullable=True),
    sa.Column('language', sa.String(), nullable=True),
    sa.Column('age', sa.Integer(), nullable=True),
    sa.Column('picture', sa.String(), nullable=True),
    sa.Column('localization', sa.String(), nullable=True),
    sa.Column('bio', sa.Text(), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    op.create_table('message',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('chat_id', sa.Integer(), nullable=True),
    sa.Column('traveler_id', sa.Integer(), nullable=True),
    sa.Column('message', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['chat_id'], ['chat.id'], ),
    sa.ForeignKeyConstraint(['traveler_id'], ['traveler.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    op.create_table('post',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('traveler_id', sa.Integer(), nullable=True),
    sa.Column('title', sa.String(), nullable=True),
    sa.Column('media', sa.String(), nullable=True),
    sa.Column('text', sa.String(), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['traveler_id'], ['traveler.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    op.create_table('trip',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('traveler_id', sa.Integer(), nullable=True),
    sa.Column('country', sa.String(), nullable=True),
    sa.Column('cities', sa.String(), nullable=True),
    sa.Column('start_date', sa.Date(), nullable=False),
    sa.Column('end_date', sa.Date(), nullable=False),
    sa.Column('activities', sa.String(), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['traveler_id'], ['traveler.name'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('text', sa.String(), nullable=True),
    sa.Column('traveler_id', sa.Integer(), nullable=True),
    sa.Column('post_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['post_id'], ['post.id'], ),
    sa.ForeignKeyConstraint(['traveler_id'], ['traveler.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    op.create_table('share_trip',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('trip_id', sa.Integer(), nullable=True),
    sa.Column('traveler_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['traveler_id'], ['traveler.id'], ),
    sa.ForeignKeyConstraint(['trip_id'], ['trip.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('share_trip')
    op.drop_table('comments')
    op.drop_table('trip')
    op.drop_table('post')
    op.drop_table('message')
    op.drop_table('traveler')
    op.drop_table('chat')
    # ### end Alembic commands ###
